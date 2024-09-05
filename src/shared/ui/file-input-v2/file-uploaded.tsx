import path from 'path';

import Big from 'big.js';
import cs from 'classnames';
import mime from 'mime-types';
import { memo } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import { FileUtils } from 'shared/lib/file';
import { Button, Text } from 'shared/ui';

import { Dimension } from './index.types';

interface PropsFileUploaded {
  file: File;
  remove: () => void;
  upload: () => void;
  root: () => DropzoneRootProps;
  input: () => DropzoneInputProps;
  dimension?: Dimension | null;
  className?: string;
  displayName?: boolean;
}

export const FileUploaded = memo((props: PropsFileUploaded) => {
  const { file, root, input, remove, upload, dimension, displayName, className } = props;

  const fileSize = Big(file.size).div(1024).div(1024).toFixed(2);
  const created = new Date(file.lastModified).toUTCString();
  const format = path.extname(file.name).slice(1).toUpperCase();
  const type = FileUtils.getFileType(mime.lookup(format));
  const name = displayName ? FileUtils.middleNameCut(file.name, 12, 9) : null;

  return (
    <div className={cs('flex flex-col pt-10 px-[65px] pb-14 w-full bg-grey-light duration-[0.2s]', className)}>
      <div>
        <div className="flex justify-between h-6">
          <Text family="inter-medium" type="s12px-h18px" color="grey" text="Created" />
          <Text family="inter-medium" type="s12px-h18px" color="grey" text={created} />
        </div>
        {name && (
          <div className="flex justify-between h-6">
            <Text family="inter-medium" type="s12px-h18px" color="grey" text="Name" />
            <Text family="inter-medium" type="s12px-h18px" color="grey" text={name} />
          </div>
        )}
        <div className="flex justify-between h-6">
          <Text family="inter-medium" type="s12px-h18px" color="grey" text="File type" />
          <Text family="inter-medium" type="s12px-h18px" color="grey" className="capitalize" text={type} />
        </div>
        <div className="flex justify-between h-6">
          <Text family="inter-medium" type="s12px-h18px" color="grey" text="Format" />
          <Text family="inter-medium" type="s12px-h18px" color="grey" text={format} />
        </div>
        <div className="flex justify-between h-6">
          <Text family="inter-medium" type="s12px-h18px" color="grey" text="Size" />
          <Text family="inter-medium" type="s12px-h18px" color="grey" text={`${fileSize}MB`} />
        </div>
        {dimension && (
          <div className="flex justify-between h-6">
            <Text family="inter-medium" type="s12px-h18px" color="grey" text="Dimensions" />
            <Text
              family="inter-medium"
              type="s12px-h18px"
              color="grey"
              text={`${dimension.height}x${dimension.width}`}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-[14px]">
        <div {...root()}>
          <input {...input()} type="file" className="w-0 h-0 opacity-0 overflow-hidden absolute -z-[1]" />
          <Button type="button" onClick={upload} theme="green" size="small" className="h-10">
            Upload new
          </Button>
        </div>
        <Button type="button" onClick={remove} theme="none" size="small" className="bg-grey bg-opacity-10  h-10">
          Remove file
        </Button>
      </div>
    </div>
  );
});
