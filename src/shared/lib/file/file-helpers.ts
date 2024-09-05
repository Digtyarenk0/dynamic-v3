import { t } from '@lingui/macro';
import axios, { AxiosResponse } from 'axios';
import mime from 'mime-types';

import { AppConfig } from 'shared/config/envs';
import { AppOptions } from 'shared/types/options';

import { Lists } from 'entities/request';

import { Pinata } from '../pinata';
import { getIPFSUrl } from '../url/url-ipfs';

export const blobToDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      if (fr.result) resolve(fr.result.toString());
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });

export const getFileType = (fileType: string | false): Lists.MintType => {
  switch (fileType) {
    case AppOptions.acceptFileFormats.image.mime.find((t) => t === fileType):
      return Lists.MintType.image;
    case AppOptions.acceptFileFormats.audio.mime.find((t) => t === fileType):
      return Lists.MintType.audio;
    case AppOptions.acceptFileFormats.video.mime.find((t) => t === fileType):
      return Lists.MintType.video;
    default:
      console.error('File type not supported.');
      return Lists.MintType.image;
  }
};

export const checkTypeContentByUrl = async (url: string) => {
  const a = await axios.head(url);
  const type = a.headers['content-type'];
  return getFileType(type);
};

export const middleNameCut = (name: string, beforeLength = 7, afterLength = 7) => {
  const { length } = name;
  if (beforeLength + afterLength >= length) {
    return name;
  }
  const before = name.substring(0, beforeLength);
  const after = name.substring(length - afterLength, length);
  return `${before}...${after}`;
};

export const endNameCut = (name: string, startLength = 10) =>
  name.length > startLength ? `${name.substring(0, startLength - 2)}...` : name;

export const blobToFile = (blob: Blob, fileName: string): File =>
  new File([blob], fileName, {
    type: blob.type,
  });

export interface UploadRequestFileToNFTStorage {
  blob: Blob;
  cid: string;
  link: string;
}

export const uploadBlobByFetch = async (res: AxiosResponse<Blob>, name: string, contentId: string): Promise<string> => {
  const form = new FormData();
  const fileName = `watermarked_nft.${mime.extension(name)}`;
  const file = blobToFile(res.data, fileName);
  form.append('file', file);
  const cid = await Pinata.uploadFile(contentId, form);
  return cid;
};

export const getFileNameFromS3URL = (url: string) =>
  url.split('filename%3D')[1].split('&response-content-type=blob&')[0];

export const uploadRequestFileToNFTStorage = async (contentId: number): Promise<UploadRequestFileToNFTStorage> => {
  const blob: AxiosResponse<Blob> = await axios.get('', {
    responseType: 'blob',
  });

  const cid = await uploadBlobByFetch(blob, getFileNameFromS3URL(''), contentId.toString());
  const link = getIPFSUrl(cid);
  return {
    blob: blob.data,
    cid,
    link,
  };
};

interface UploadRequestFileOrGetLinkProps {
  contentId: number;
  isUpload: boolean;
  url: string | undefined;
  isReturnHash?: boolean;
}

export const uploadRequestFileOrGetLink = async ({
  contentId,
  isUpload,
  url,
  isReturnHash = true,
}: UploadRequestFileOrGetLinkProps): Promise<string> => {
  const prefix = isReturnHash ? 'ipfs://' : `${AppConfig.ipfsUrl}ipfs/`;
  if (isUpload) {
    const { cid } = await uploadRequestFileToNFTStorage(contentId);
    return `${prefix}${cid}`;
  } else if (url) {
    return url;
  }
  throw new Error(t`Link to file not found`);
};

interface UploadRequestWithPreviewOrGetLink extends UploadRequestFileOrGetLinkProps {
  preview: File;
  isReturnHash?: boolean;
}

export const uploadRequestWithPreviewOrGetLink = async ({
  contentId,
  isUpload,
  url,
  preview,
  isReturnHash = true,
}: UploadRequestWithPreviewOrGetLink) => {
  const prefix = isReturnHash ? 'ipfs://' : `${AppConfig.ipfsUrl}ipfs/`;
  if (isUpload) {
    const blob: AxiosResponse<Blob> = await axios.get('', {
      responseType: 'blob',
    });

    const anmCid = await uploadBlobByFetch(blob, getFileNameFromS3URL(''), contentId.toString());
    const form = new FormData();
    form.append('file', preview);
    const cid = await Pinata.uploadFile(contentId, form, true);
    return {
      image: `${prefix}${cid}`,
      animation_url: `${prefix}${anmCid}`,
    };
  } else if (url) {
    const form = new FormData();
    form.append('file', preview);
    const cid = await Pinata.uploadFile(contentId, form, true);
    return {
      image: `${prefix}${cid}/${preview.name}`,
      animation_url: url,
    };
  }
  throw new Error(t`Link to file not found`);
};

export const blobToObject = (file: Blob) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      if (fr.result) resolve(JSON.parse(fr.result.toString()));
    };
    fr.onerror = reject;
    fr.readAsText(file, 'utf8');
  });

export const readKeyFileAsync = (keyFile: Blob) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      res(reader.result);
    };
    reader.onerror = (error) => {
      rej(error);
    };
    reader.readAsArrayBuffer(keyFile);
  });

export const saveKeyFile = (file: File, name: string) => {
  const a: HTMLAnchorElement = document.createElement('a');
  // a.style = 'display: none';
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const downloadElement = (name: string, file: string) => {
  const link = document.createElement('a');
  link.href = file;
  link.download = name;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
