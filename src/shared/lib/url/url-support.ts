import path from 'path';

import { t } from '@lingui/macro';
import axios from 'axios';
import mime from 'mime-types';

import { AppConfig } from 'shared/config/envs';
import { checkIsNotSupportFileType } from 'shared/lib/validators/validators';
import { AppOptions } from 'shared/types/options';

import { FileUtils } from '../file';
import { getFileType } from '../file/file-helpers';
import { checkAudioSize } from '../file/validators/audio';
import { checkImageSize } from '../file/validators/image';
import { checkVieoSize } from '../file/validators/video';

import { getNFTStorageUrlByHash } from './url-ipfs';

export const directLinkValidate = (url: string): string | false => {
  try {
    const { pathname } = new URL(url);
    const { base, ext } = path.parse(pathname);
    try {
      const type = FileUtils.getFileType(mime.lookup(ext));
      const isNotTypeSupport = checkIsNotSupportFileType(base, type);
      if (isNotTypeSupport) {
        return isNotTypeSupport;
      } else {
        return false;
      }
    } catch (error: any) {
      return error.message;
    }
  } catch (error: any) {
    return t`Is invalid URL / IPFS hash`;
  }
};

export const checkIPFSLinkContent = async (ipfsHash: string) => {
  const nftStorageURL = getNFTStorageUrlByHash(ipfsHash);
  const res = await axios.head(nftStorageURL);
  const type = res.headers['content-type'];
  const size = Number(res.headers['content-length']);
  verificationSizeType(type, size);
  return true;
};

export const verificationSizeType = (type: string, size: number) => {
  const contectType = getFileType(type);
  switch (contectType) {
    case AppOptions.fileContentTypes.image: {
      checkImageSize(size);
      break;
    }
    case AppConfig.support.audio && AppOptions.fileContentTypes.audio: {
      checkAudioSize(size);
      break;
    }
    case AppConfig.support.video && AppOptions.fileContentTypes.video:
      checkVieoSize(size);
      break;
    default:
      throw new Error(t`Err unsupport content type`);
  }
};
