import path from 'path';

import { t } from '@lingui/macro';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import AudioSVG from 'shared/assets/icons/preview/audio.svg';
import ImageSVG from 'shared/assets/icons/preview/image.svg';
import VideoSVG from 'shared/assets/icons/preview/video.svg';
//
import { FileUtils } from 'shared/lib/file';
import { getVideoFrameDataURL } from 'shared/lib/file/video/video-preview.helper';

import { MintType } from 'entities/request';

import { Text } from '../text';

interface PreviewPropsI {
  className: string;
  previewFile: File;
  cost?: number;
}

export const Preview = ({ previewFile, cost, className }: PreviewPropsI) => {
  const [media, setMedia] = useState<React.ReactElement>();
  const name = FileUtils.middleNameCut(path.parse(previewFile.name).name, 12, 9);

  useEffect(() => {
    const type = FileUtils.getFileType(previewFile.type);
    switch (type) {
      case MintType.image: {
        const objectUrl = URL.createObjectURL(previewFile);
        return setMedia(
          <div className="relative">
            <img src={objectUrl} loading="lazy" alt="" />
            <ImageSVG className="absolute bottom-0" />
          </div>,
        );
      }
      case MintType.audio: {
        return setMedia(
          <div className="relative">
            <AudioSVG className="absolute bottom-0" />
          </div>,
        );
      }
      case MintType.video: {
        getVideoFrameDataURL(previewFile).then((i) => {
          setMedia(
            <div className="relative">
              <img src={i} loading="lazy" alt="" />
              <VideoSVG className="absolute bottom-0" />
            </div>,
          );
        });
        break;
      }
      default:
        console.error('Preview unsup type');
        break;
    }
  }, [previewFile]);

  return (
    <div className={classNames('pl-36 w-[395px]', className)}>
      {media}
      <div className="mt-4">
        <Text family="inter-medium" color="grey" type="s12px-h18px" text={t`Name`} />
        <Text
          family="inter-medium"
          color="primary"
          type="s14px-h24px"
          className="max-w-[230px] whitespace-nowrap overflow-hidden text-ellipsis"
          text={name}
        />
      </div>
      {cost !== undefined && (
        <div className="mt-4">
          <Text family="inter-medium" color="grey" type="s12px-h18px" text={t`Cost`} />
          <Text
            family="inter-medium"
            color="primary"
            type="s14px-h24px"
            className="max-w-[230px] whitespace-nowrap overflow-hidden text-ellipsis"
            text={`~${cost} USDT`}
          />
        </div>
      )}
    </div>
  );
};
