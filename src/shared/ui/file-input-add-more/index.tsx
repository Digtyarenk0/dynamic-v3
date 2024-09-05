import { t } from '@lingui/macro';
import cs from 'classnames';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { HandleMultipleFilesChangeAddMore } from 'shared/lib/file';
import { Text } from 'shared/ui';

import styles from './file-input-add-more.module.scss';
import { FileInputPropsI } from './index.types';

export const FileInputAddMore = ({
  onChange: { files, setValue, setError, clearErrors },
  className,
  accept,
}: FileInputPropsI) => {
  const fileInputOnChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) =>
      HandleMultipleFilesChangeAddMore({
        inputFiles: e.target.files && Array.from(e.target.files),
        formFiles: files,
        setValue,
        setError,
        clearErrors,
      }),
    [clearErrors, setError, setValue, files],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      HandleMultipleFilesChangeAddMore({
        inputFiles: acceptedFiles,
        formFiles: files,
        setValue,
        setError,
        clearErrors,
      });
    },
    [clearErrors, files, setError, setValue],
  );

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, accept, noClick: true });

  return (
    <div {...getRootProps()} className="w-full">
      <input
        {...getInputProps()}
        type="file"
        onChange={fileInputOnChange}
        className="w-0 h-0 opacity-0 overflow-hidden absolute -z-[1]"
      />
      <button className={cs(styles.upload, className)} type="button" onClick={open}>
        <Text type="s16px-h24px" family="pt-bold" color="primary" text={t`+ Add More`} />
      </button>
    </div>
  );
};
