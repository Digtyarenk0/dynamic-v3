import { Trans, t } from '@lingui/macro';
import cs from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UseFormClearErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form';

import PictureSVG from 'shared/assets/icons/containers/picture.svg';
import { FileUtils, HandleMultipleFilesChange } from 'shared/lib/file';
import { getImageScale } from 'shared/lib/file/validators/image';
import { AppOptions } from 'shared/types/options';
import { Text } from 'shared/ui';

import styles from './file-input-multiple.module.scss';
import { Dimension, FileUploaded } from './file-uploaded';

interface FileInputPropsI {
  onChange: {
    files?: File[];
    setError: UseFormSetError<any>;
    setValue: UseFormSetValue<any>;
    clearErrors: UseFormClearErrors<any>;
  };
  accept: { [key: string]: string[] };
  className?: string;
  supportFormats?: string;
  helperText?: boolean;
  title?: string;
}

export const FileInputMultiple = (props: FileInputPropsI) => {
  const {
    className,
    title = '',
    onChange: { files, setValue, setError, clearErrors },
    accept,
    supportFormats,
  } = props;

  const [dimension, setDimension] = useState<Dimension | null>(null);
  const fileInputOnChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) =>
      HandleMultipleFilesChange({
        inputFiles: e.target.files && Array.from(e.target.files),
        setValue,
        setError,
        clearErrors,
      }),
    [clearErrors, setError, setValue],
  );

  const triggerFileRemove = useCallback(() => {
    setValue('files', null);
    clearErrors('files');
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      HandleMultipleFilesChange({
        inputFiles: acceptedFiles,
        setValue,
        setError,
        clearErrors,
      });
    },
    [clearErrors, setError, setValue],
  );
  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, accept, noClick: true });

  useEffect(() => {
    if (files?.length) {
      const type = FileUtils.getFileType(files[0].type);
      if (AppOptions.fileContentTypes.image === type) {
        (async () => {
          const { width, height } = await getImageScale(files[0]);
          setDimension({ width, height });
        })();
      } else {
        setDimension(null);
      }
    }
  }, [files]);

  if (files?.length) {
    return (
      <FileUploaded
        file={files[0]}
        input={getInputProps}
        root={getRootProps}
        upload={open}
        remove={triggerFileRemove}
        dimension={dimension}
        className={className}
      />
    );
  }

  return (
    <div className="w-full">
      <div {...getRootProps()} className="w-full">
        <input
          {...getInputProps()}
          onChange={fileInputOnChange}
          type="file"
          className="w-0 h-0 opacity-0 overflow-hidden absolute -z-[1]"
        />
        <button className={cs(styles.upload, 'bg-grey-light', className)} type="button" onClick={open} value={title}>
          <PictureSVG width={42} height={42} viewBox="0 0 46 46" className={cs('mb-[10px]', styles.ico)} />
          <div className={cs('flex mb-2', styles.title)}>
            <p>
              <Trans>Drag and drop, or</Trans>&nbsp;
            </p>
            <p className={styles.title_link}>
              <Trans>Browse</Trans>
            </p>
            <p>
              &nbsp; <Trans>your files</Trans>
            </p>
          </div>
          {supportFormats && (
            <Text
              family="inter-regular"
              type="s12px-h18px"
              color="grey-o50"
              align="center"
              text={t`Supported formats: ${supportFormats}`}
            />
          )}
        </button>
      </div>
    </div>
  );
};
