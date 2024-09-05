import { t } from '@lingui/macro';
import { memo } from 'react';

import { contentRequirements } from 'shared/lib/file';
import { getImgFilesAccepts } from 'shared/lib/file/validators';

import { TableBody, TableContainer, TableHeader } from '../table';
import { Text } from '../text';

const columns = [
  { title: t`field`, width: 'w-[20%]' },
  { title: t`Minimal`, width: 'w-[40%]' },
  { title: t`Maximal`, width: 'w-[40%] !justify-normal' },
];

export const BlockContentRequerementsImage = memo(() => {
  return (
    <div className="m-1.5">
      <TableContainer>
        <TableHeader columns={columns} />
        <TableBody>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Formats`} />
            <Text color="grey" className={columns[1].width} text={`${getImgFilesAccepts().join(', ')}`} />
            <Text color="grey" className={columns[2].width} />
          </div>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Resolution`} />
            <Text
              color="grey"
              className={columns[1].width}
              text={`${contentRequirements.image.scale.min.width}x${contentRequirements.image.scale.min.height} px`}
            />
            <Text
              color="grey"
              className={columns[2].width}
              text={`${contentRequirements.image.scale.max.width}x${contentRequirements.image.scale.max.height} px`}
            />
          </div>
          <div className="flex py-2 px-2.5">
            <Text color="grey" className={columns[0].width} text={t`Size on disk`} />
            <Text color="grey" className={columns[1].width} text={`-`} />
            <Text color="grey" className={columns[2].width} text={`${contentRequirements.image.maxSize} mb`} />
          </div>
        </TableBody>
      </TableContainer>
    </div>
  );
});
