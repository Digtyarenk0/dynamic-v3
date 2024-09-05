import { t } from '@lingui/macro';
import mime from 'mime-types';

import { contentRequirements } from 'shared/constants/content-requirements';
import { AppOptions } from 'shared/types/options';

import { checkFileSize } from '../files-verification';

export const getImageAccept = () => ({
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/bmp': ['.bmp'],
});

export const getImageStringExt = () => AppOptions.acceptFileFormats.image.mime.map((i) => mime.extension(i)).join(', ');

export const getImageStringMime = () => AppOptions.acceptFileFormats.image.mime.join(', ');

export const checkImageSize = (size: number) => {
  if (checkFileSize(size, contentRequirements.image.maxSize)) {
    throw new Error(t`Supports image only size up to ${contentRequirements.image.maxSize} mb`);
  }
};

export const getImageScale = (file: Blob): Promise<HTMLImageElement> =>
  new Promise((res) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        res(img);
      };
      if (reader.result) img.src = reader.result?.toString();
    };
    reader.readAsDataURL(file);
  });

export const checkImageScale = (fileToCheck: Blob): Promise<HTMLImageElement> =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // MAX DATA: w8000 x h4500 || w4500 x h8000
        const isMoreMaxScaleWH =
          img.width > contentRequirements.image.scale.max.width ||
          img.height > contentRequirements.image.scale.max.height;
        // More width/height
        if (isMoreMaxScaleWH) {
          const isMoreMaxScaleHW =
            img.height > contentRequirements.image.scale.max.width ||
            img.width > contentRequirements.image.scale.max.height;
          // More height/width
          if (isMoreMaxScaleHW) {
            rej(
              new Error(
                t`Image width and height shouldn\`t be more than ${contentRequirements.image.scale.max.width}x${contentRequirements.image.scale.max.height}px`,
              ),
            );
          }
        }
        const isLessMinScale =
          img.width < contentRequirements.image.scale.min.width ||
          img.height < contentRequirements.image.scale.min.height;
        if (isLessMinScale) {
          rej(
            new Error(
              t`Image width and height shouldn\`t be less than ${contentRequirements.image.scale.min.width}x${contentRequirements.image.scale.min.height}px`,
            ),
          );
        }
        res(img);
      };
      if (reader.result) img.src = reader.result.toString();
    };
    reader.readAsDataURL(fileToCheck);
  });

export const getCountSupportWMByScale = (fileToCheck: File): Promise<number> =>
  new Promise((res) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        if ((img.width >= 1598 && img.height >= 224) || (img.width >= 911 && img.height >= 911)) {
          res(3);
        }
        if (img.width >= 911 && img.height >= 224 && img.width < 1598) {
          res(2);
        }
        if (img.width >= 224 && img.height >= 224 && img.width < 911) {
          res(1);
        }
        res(0);
      };
      if (reader.result) img.src = reader.result.toString();
    };
    reader.readAsDataURL(fileToCheck);
  });
