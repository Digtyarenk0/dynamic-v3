import { Trans, t } from '@lingui/macro';
import cs from 'classnames';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UseFormSetError, UseFormClearErrors, UseFormSetValue } from 'react-hook-form';

import PictureSVG from 'shared/assets/icons/containers/picture.svg';
import { FileUtils, HandleFileChange } from 'shared/lib/file';
import { getImageScale } from 'shared/lib/file/validators/image';
import { AppOptions } from 'shared/types/options';
import { Text } from 'shared/ui/text';

import styles from './file-input.module.scss';
import { FileUploaded } from './file-uploaded';
import { Dimension } from './index.types';

interface FileInputPropsI {
  onChange: {
    file?: File;
    setError: UseFormSetError<any>;
    setValue: UseFormSetValue<any>;
    clearErrors: UseFormClearErrors<any>;
  };
  accept: { [key: string]: string[] };
  supportFormats?: string;
  title?: string;
  className?: string;
  classNameUploaded?: string;
  displayName?: boolean;
}

export const FileInputV2 = memo((props: FileInputPropsI) => {
  const {
    className,
    classNameUploaded,
    title = '',
    onChange: { file, setValue, setError, clearErrors },
    accept,
    supportFormats,
    displayName,
  } = props;

  const [dimension, setDimension] = useState<Dimension | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      HandleFileChange({
        inputFiles: acceptedFiles,
        setValue,
        clearErrors,
      });
    },
    [clearErrors, setError, setValue],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    noClick: true,
  });

  const triggerFileRemove = useCallback(() => {
    setValue('file', null);
    clearErrors('file');
  }, []);

  useEffect(() => {
    if (file) {
      const type = FileUtils.getFileType(file.type);
      if (AppOptions.fileContentTypes.image === type) {
        (async () => {
          const { width, height } = await getImageScale(file);
          setDimension({ width, height });
        })();
      } else {
        setDimension(null);
      }
    }
  }, [file]);

  if (file) {
    return (
      <FileUploaded
        file={file}
        input={getInputProps}
        root={getRootProps}
        upload={open}
        remove={triggerFileRemove}
        dimension={dimension}
        displayName={displayName}
        className={classNameUploaded}
      />
    );
  }

  return (
    <div className="w-full">
      <div {...getRootProps()} className="w-full">
        <input {...getInputProps()} type="file" className='"w-0 h-0 opacity-0 overflow-hidden absolute -z-[1]"' />
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
              &nbsp;<Trans>your files</Trans>
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
});
