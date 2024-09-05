import { t } from '@lingui/macro';
import cs from 'classnames';
import { useState } from 'react';

import { Text } from 'shared/ui/text';

import { ButtonText } from '../button-text';

import { BlockContentRequerementsAudio } from './audio';
import { BlockContentRequerementsImage } from './image';
import { BlockContentRequerementsVideo } from './video';

export type BlockContentRequerementsType = 'img' | 'video' | 'audio';

export const BlockContentRequerements = () => {
  const [reqType, setReqType] = useState<BlockContentRequerementsType | null>(null);

  return (
    <div>
      <div className="flex items-center py-3">
        <Text family="inter-regular" type="s14px-h24px" color="grey" text={t`Content requirements: `} />
        <ButtonText
          onClick={() => setReqType('img' === reqType ? null : 'img')}
          className={cs('text-sm ml-3 underline', reqType === 'img' ? '!text-grey' : '!text-green-alert')}
          text="Image"
        />
        <ButtonText
          onClick={() => setReqType('audio' === reqType ? null : 'audio')}
          className={cs('text-sm ml-3 underline', reqType === 'audio' ? '!text-grey' : '!text-green-alert')}
          text="Audio"
        />
        <ButtonText
          onClick={() => setReqType('video' === reqType ? null : 'video')}
          className={cs('text-sm ml-3 underline', reqType === 'video' ? '!text-grey' : '!text-green-alert')}
          text="Video"
        />
      </div>
      {reqType === 'img' && <BlockContentRequerementsImage />}
      {reqType === 'video' && <BlockContentRequerementsVideo />}
      {reqType === 'audio' && <BlockContentRequerementsAudio />}
    </div>
  );
};
