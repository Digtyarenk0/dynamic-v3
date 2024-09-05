import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { t } from '@lingui/macro';
import mime from 'mime-types';

import { contentRequirements } from 'shared/constants/content-requirements';
import { AppOptions } from 'shared/types/options';

import { checkFileSize } from '../files-verification';

export const getVideoAccept = () => ({
  'video/mp4': ['.mp4'],
});

export const getVideoStringExt = () => AppOptions.acceptFileFormats.video.mime.map((i) => mime.extension(i)).join(', ');

export const getVideoStringMime = () => AppOptions.acceptFileFormats.video.mime.join(', ');

export const checkVieoSize = (size: number) => {
  if (checkFileSize(size, contentRequirements.video.maxSize)) {
    throw new Error(t`Supports video only size up to ${contentRequirements.video.maxSize} mb`);
  }
};

export const checkVieoFps = (fps: number) => {
  const isValidFpsfps = fps >= contentRequirements.video.fps.min && fps <= contentRequirements.video.fps.max;
  if (!isValidFpsfps) {
    throw new Error(
      t`Supports video from ${contentRequirements.video.fps.min} to ${contentRequirements.video.fps.max} fps only`,
    );
  }
};

export const checkVieoDuration = (duration: number, fps: number) => {
  if (duration < contentRequirements.video.duration.min) {
    throw new Error(t`Supports video only duration from ${contentRequirements.video.duration.min} s.`);
  }

  if (fps <= 30) {
    if (duration > contentRequirements.video.duration.max.less30FPS) {
      throw new Error(
        t`For videos with a frequency less than 30 fps, the maximum length is ${contentRequirements.video.duration.max.less30FPS} s.`,
      );
    }
  }
  if (fps > 30) {
    if (duration > contentRequirements.video.duration.max.more30FPS) {
      throw new Error(
        t`For videos with a frequency greater than 30 fps, the maximum length is ${contentRequirements.video.duration.max.more30FPS} s.`,
      );
    }
  }
};

export const checkScale = (w: number, h: number) => {
  const isMoreMaxScaleWH =
    w > contentRequirements.video.resolution.max.width || h > contentRequirements.video.resolution.max.height;
  // More width/height
  if (isMoreMaxScaleWH) {
    const isMoreMaxScaleHW =
      h > contentRequirements.video.resolution.max.width || w > contentRequirements.video.resolution.max.height;
    // More height/width
    if (isMoreMaxScaleHW) {
      new Error(
        t`Video width and height shouldn\`t be more than ${contentRequirements.video.resolution.max.width}x${contentRequirements.video.resolution.max.height}px`,
      );
    }
  }
  const isLessMinScale =
    w < contentRequirements.video.resolution.min.width || h < contentRequirements.video.resolution.min.height;
  if (isLessMinScale) {
    new Error(
      t`Video width and height shouldn\`t be less than ${contentRequirements.video.resolution.min.width}x${contentRequirements.video.resolution.min.height}px`,
    );
  }
};

export interface VideoMetada {
  duration: number;
  size: number;
  fps: number;
  width: number;
  height: number;
}

export const getVideoMetadata = async (file: File): Promise<VideoMetada> => {
  const ffmpeg = new FFmpeg();
  const objectUrl = URL.createObjectURL(file);
  await ffmpeg.load();
  await ffmpeg.writeFile('input.webm', await fetchFile(objectUrl));
  const arrExecMsg: string[] = [];
  ffmpeg.on('log', ({ message }) => {
    arrExecMsg.push(message);
  });
  await ffmpeg.exec(['-hide_banner', '-i', 'input.webm']);
  const msg = arrExecMsg.toString();

  // FPS / 0
  const fps = Number(msg.match(/(\d+(?:\.\d+)?)\s?fps/)?.[1] || 0);

  // Duration
  const duration = msg
    .slice(msg.indexOf('Duration: ') + 10, msg.indexOf(', start: '))
    .split(':')
    .reduce((acc, val) => acc * 60 + +val, 0);

  // Scale
  const matches = msg.match(/(\d{3,5})x(\d{3,5})/) as string[];
  const width = parseInt(matches?.[1] || '0');
  const height = parseInt(matches?.[2] || '0');

  const meta = {
    duration,
    size: file.size,
    fps,
    width,
    height,
  };
  console.log('meta:', meta);

  return meta;
};

export const checkVieoMetadata = async (file: File) => {
  checkVieoSize(file.size);
  const metadata = await getVideoMetadata(file);
  checkScale(metadata.width, metadata.height);
  checkVieoFps(metadata.fps);
  checkVieoDuration(metadata.duration, metadata.fps);
};
