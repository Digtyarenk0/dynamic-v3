import { t } from '@lingui/macro';
import { memo } from 'react';

import { contentRequirements } from 'shared/lib/file';
import { getVideoFilesAccepts } from 'shared/lib/file/validators';

import { TableBody, TableContainer, TableHeader } from '../table';
import { Text } from '../text';

const columns = [
  { title: t`field`, width: 'w-[20%]' },
  { title: t`Minimal`, width: 'w-[40%]' },
  { title: t`Maximal`, width: 'w-[40%] !justify-normal' },
];

export const BlockContentRequerementsVideo = memo(() => {
  return (
    <div className="m-1.5">
      <TableContainer>
        <TableHeader columns={columns} />
        <TableBody>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Formats`} />
            <Text color="grey" className={columns[1].width} text={`${getVideoFilesAccepts().join(', ')}`} />
            <Text color="grey" className={columns[2].width} />
          </div>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Resolution`} />
            <Text
              color="grey"
              className={columns[1].width}
              text={`${contentRequirements.video.resolution.min.width}x${contentRequirements.video.resolution.min.height} px`}
            />
            <Text
              color="grey"
              className={columns[2].width}
              text={`${contentRequirements.video.resolution.max.width}x${contentRequirements.video.resolution.max.height} px OR ${contentRequirements.video.resolution.max.height}x${contentRequirements.video.resolution.max.width} px`}
            />
          </div>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`FPS`} />
            <Text color="grey" className={columns[1].width} text={`${contentRequirements.video.fps.min} fps`} />
            <Text color="grey" className={columns[2].width} text={`${contentRequirements.video.fps.max} fps`} />
          </div>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Length`} />
            <Text color="grey" className={columns[1].width} text={`${contentRequirements.video.duration.min} s.`} />
            <Text
              color="grey"
              className={columns[2].width}
              text={`${contentRequirements.video.duration.max.less30FPS} s. for < 30fps OR ${contentRequirements.video.duration.max.more30FPS} s. for > 30fps`}
            />
          </div>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Size on disk`} />
            <Text color="grey" className={columns[1].width} text={`-`} />
            <Text color="grey" className={columns[2].width} text={`${contentRequirements.video.maxSize} mb`} />
          </div>
        </TableBody>
      </TableContainer>
    </div>
  );
});
