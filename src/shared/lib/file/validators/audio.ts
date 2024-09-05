import { t } from '@lingui/macro';
import Big from 'big.js';
import mime from 'mime-types';

import { contentRequirements } from 'shared/constants/content-requirements';
import { AppOptions } from 'shared/types/options';

import { AudioMetadata } from '../audio/audio.helper';
import { checkFileSize } from '../files-verification';

export const getAudioAccept = () => ({
  'audio/wav': ['.wav'],
  'audio/wave': ['.wav'],
  'audio/x-wav': ['.wav'],
});

export const getAudioStringExt = () => AppOptions.acceptFileFormats.audio.mime.map((i) => mime.extension(i)).join(', ');

export const getAudioStringMime = () => AppOptions.acceptFileFormats.audio.mime.join(', ');

export const checkAudioSize = (size: number) => {
  if (checkFileSize(size, contentRequirements.audio.maxSize)) {
    throw new Error(t`Supports audio only size up to ${contentRequirements.audio.maxSize} mb`);
  }
};

export const checkAudioDuration = (duration: number) => {
  const isLessMinLength = duration < contentRequirements.audio.duration.min;
  const isMoreMinLength = duration > contentRequirements.audio.duration.max;
  if (isLessMinLength || isMoreMinLength) {
    throw new Error(
      t`Audio length must be between ${contentRequirements.audio.duration.min} and ${contentRequirements.audio.duration.max} seconds`,
    );
  }
};
export const checkAudioHz = (hz: number) => {
  if (hz < contentRequirements.audio.hz.min) {
    throw new Error(t`Supports audio with sample rate ${contentRequirements.audio.hz.toString()} only`);
  }
};

export const checkAudioChannels = (channels: number) => {
  const isSupportCountChannels = channels === 1 || channels === 2;
  if (!isSupportCountChannels) throw new Error(t`Only 1 and 2 channel audio files are supported`);
};

export const checkAudioSmpls = (samples: number, duration: number) => {
  const smpls = Big(duration).mul(samples);
  if (smpls.lte(contentRequirements.audio.smpls.min))
    throw new Error(t`Minimum number of samples required: ${contentRequirements.audio.smpls.min}`);
  if (smpls.gte(contentRequirements.audio.smpls.max))
    throw new Error(t`Maximum number of samples ${contentRequirements.audio.smpls.max}`);
};

export const checkAudioMetadata = (meta: AudioMetadata) => {
  checkAudioHz(meta.samples);
  checkAudioDuration(meta.duration);
  checkAudioSmpls(meta.samples, meta.duration);
  checkAudioChannels(meta.channels);
};
