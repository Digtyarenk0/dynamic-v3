import path from 'path';

import mime from 'mime-types';

import { headContentType } from 'shared/api/api-helper';
import { AppConfig } from 'shared/config/envs';
import { getIPFSUrl } from 'shared/lib/url/url-ipfs';
import { Validators } from 'shared/lib/validators';

import { Lists } from 'entities/request';

import { getFileType } from '../file-helpers';

import { getAudioStringMime, getAudioAccept, getAudioStringExt } from './audio';
import { getImageAccept, getImageStringExt, getImageStringMime } from './image';
import { getVideoAccept, getVideoStringExt, getVideoStringMime } from './video';

export const getAllFilesStringMime = () => {
  const image = getImageStringMime();
  const audio = AppConfig.support.audio ? `, ${getAudioStringMime()}` : '';
  const video = AppConfig.support.video ? `, ${getVideoStringMime()}` : '';
  return `${image}${audio}${video}`;
};

export const getAllFilesAccept = () => {
  const image = getImageAccept();
  const audio = AppConfig.support.audio && getAudioAccept();
  const video = AppConfig.support.video && getVideoAccept();
  return {
    ...image,
    ...audio,
    ...video,
  };
};

export const getAllFilesStringExt = () => {
  const image = getImageStringExt();
  const audio = AppConfig.support.audio ? `, ${getAudioStringExt()}` : '';
  const video = AppConfig.support.video ? `, ${getVideoStringExt()}` : '';
  return `${image}${audio}${video}`;
};

export const getImgFilesAccepts = () => {
  return Object.values(getImageAccept())
    .reduce((ac, i) => [...ac, ...i])
    .map((i) => i.substring(1).toUpperCase());
};

export const getVideoFilesAccepts = () => {
  return ['mp4'].map((i) => i.toUpperCase());
};
export const getAudioFilesAccepts = () => {
  return ['wav'].map((i) => i.toUpperCase());
};

export const getAllFilesAccepts = () => {
  const image = getImgFilesAccepts();

  const audio = AppConfig.support.audio ? getAudioFilesAccepts() : [];

  const video = AppConfig.support.video ? getVideoFilesAccepts() : [];
  return [...image, ...audio, ...video];
};

export const fileTypeFromURL = (url: string) => {
  try {
    const { pathname } = new URL(url);
    const type = mime.lookup(path.extname(pathname));
    return type;
  } catch (error) {
    console.error('File type from URL', error, url);
    return false;
  }
};

export const getFileTypeFromUrl = async (url: string): Promise<Lists.MintType> => {
  const link = Validators.isIPFSHash.test(url) ? getIPFSUrl(url) : url;
  const typeLink = fileTypeFromURL(link);
  const type = typeLink || (await headContentType(link));
  return getFileType(type);
};
