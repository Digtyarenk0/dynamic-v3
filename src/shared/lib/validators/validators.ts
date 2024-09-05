import path from 'path';

import { t } from '@lingui/macro';
import mime from 'mime-types';

import { AppConfig } from 'shared/config/envs';
import { Env } from 'shared/config/envs/type';
import { AppOptions } from 'shared/types/options';

import { getFileType } from '../file/file-helpers';
import { getAudioStringExt } from '../file/validators/audio';
import { getImageStringExt } from '../file/validators/image';
import { getVideoStringExt } from '../file/validators/video';

export const email = /^\S+@\S+$/i;

export const isIPFSHash = /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|[A-z2-7]{59})$/;

export const isUrl = (inURL: string) => {
  let url;
  try {
    url = new URL(inURL);
  } catch (_) {
    return false;
  }
  if (url.protocol === 'ipfs:') {
    return false;
  }
  if (url.protocol === 'http:' || url.protocol === 'https:') {
    return url;
  }
  return false;
};

export const checkIsNotSupportFileType = (base: string, type: string) => {
  const msg = t`Please select a file of one of the following formats: `;
  const extname = path.extname(base).toLocaleLowerCase();
  switch (type) {
    case AppOptions.fileContentTypes.image:
      if (!AppOptions.acceptFileFormats.image.ext.find((el) => el === extname)) {
        return msg + getImageStringExt();
      }
      return false;
    case AppOptions.fileContentTypes.audio:
      if (!AppOptions.acceptFileFormats.audio.ext.find((el) => el === extname)) {
        return msg + getAudioStringExt();
      }
      return false;
    case AppOptions.fileContentTypes.video:
      if (!AppOptions.acceptFileFormats.video.ext.find((el) => el === extname)) {
        return msg + getVideoStringExt();
      }
      return false;
    default:
      throw new Error(t`File type not supported.`);
  }
};

export const isGoogleDriveLink = (grantedurl: string) => {
  const origin = 'https://drive.google.com';
  const path = '/file/d/';
  let url: URL;
  try {
    url = new URL(grantedurl);
  } catch (_) {
    return false;
  }
  if (url.origin === origin && url.pathname.substring(0, 8) === path) {
    return url;
  }
  return false;
};

export const validateUrl = (url: string) => {
  try {
    if (isIPFSHash.test(url)) {
      return !!new URL(`ipfs:/${url}`);
    }
    const { pathname } = new URL(url);
    const { base, ext } = path.parse(pathname);
    const lookup = mime.lookup(ext);
    const type = getFileType(lookup);
    const isTypeSupport = checkIsNotSupportFileType(base, type);
    return !isTypeSupport;
  } catch (error) {
    return false;
  }
};

export const isRaribleUrl = (url: string) => {
  if (isUrl(url)) {
    const { pathname, origin } = new URL(url);
    const isCurrent = AppConfig.platforms.rarible.url === origin;
    const toToken = '/token/polygon/0x' === pathname.substr(0, 17);
    return isCurrent && toToken;
  }
};

export const isOpenSeaUrl = (url: string) => {
  if (isUrl(url)) {
    const { pathname, origin } = new URL(url);
    const isCurrent = AppConfig.platforms.opensea.url === origin;
    const chain = AppConfig.net === Env.testnet ? 'amoy' : 'matic';
    const toToken = `/assets/${chain}/0x` === pathname.substr(0, 11 + chain.length);
    return isCurrent && toToken;
  }
};

export const secondToTime = (duration: number) => {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;
  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = '';

  if (hrs > 0) {
    ret += `${hrs}:${mins < 10 ? '0' : ''}`;
  }
  ret += `${mins}:${secs < 10 ? '0' : ''}`;
  ret += `${secs}`;
  return ret;
};

const monthNames = [t`Jan`, t`Feb`, t`Mar`, t`Apr`, t`May`, t`June`, t`July`, t`Aug`, t`Sept`, t`Oct`, t`Nov`, t`Dec`];

export const dateAgo = (tm: number) => {
  // Now time
  const now = new Date();
  const nowTime = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
  };

  // Got time
  const receivedTime = new Date(tm * 1000);
  const time = {
    year: receivedTime.getFullYear(),
    month: receivedTime.getMonth(),
    day: receivedTime.getDate(),
    hours: receivedTime.getHours(),
    minutes: receivedTime.getMinutes(),
  };

  if (nowTime.year === time.year && nowTime.month === time.month) {
    if (nowTime.day <= time.day) {
      if (nowTime.hours === time.hours) {
        return t`${nowTime.minutes - time.minutes} min ago`;
      }
      return t`${nowTime.hours - time.hours} hours ago`;
    }
    const ago = nowTime.day - time.day;
    return t`${ago} ${ago === 1 ? 'day' : 'days'}  ago`;
  }
  return `${time.day} ${monthNames[time.month]} ${time.year}`;
};
