import { t } from '@lingui/macro';
import { memo } from 'react';

import { contentRequirements } from 'shared/lib/file';
import { getAudioFilesAccepts } from 'shared/lib/file/validators';

import { TableBody, TableContainer, TableHeader } from '../table';
import { Text } from '../text';

const columns = [
  { title: t`field`, width: 'w-[20%]' },
  { title: t`Minimal`, width: 'w-[40%]' },
  { title: t`Maximal`, width: 'w-[40%] !justify-normal' },
];

export const BlockContentRequerementsAudio = memo(() => {
  return (
    <div className="m-1.5">
      <TableContainer>
        <TableHeader columns={columns} />
        <TableBody>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Formats`} />
            <Text color="grey" className={columns[1].width} text={`${getAudioFilesAccepts().join(', ')}`} />
            <Text color="grey" className={columns[2].width} />
          </div>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Length`} />
            <Text color="grey" className={columns[1].width} text={t`25 * 44100 frames`} />
            <Text color="grey" className={columns[2].width} text={t`600 * 44100 frames`} />
          </div>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Sample rate`} />
            <Text color="grey" className={columns[1].width} text={`${contentRequirements.audio.hz.min} Hz.`} />
            <Text color="grey" className={columns[2].width} text={`-`} />
          </div>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Channels`} />
            <Text color="grey" className={columns[1].width} text={contentRequirements.audio.channels.min} />
            <Text color="grey" className={columns[2].width} text={contentRequirements.audio.channels.max} />
          </div>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Size on disk`} />
            <Text color="grey" className={columns[1].width} text={`-`} />
            <Text color="grey" className={columns[2].width} text={`${contentRequirements.audio.maxSize} mb`} />
          </div>
        </TableBody>
      </TableContainer>
    </div>
  );
});
