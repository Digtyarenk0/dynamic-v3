import { Trans } from '@lingui/macro';
import cs from 'classnames';
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import UploadBrakeSvg from 'shared/assets/icons/upload_brake.svg';
import { FileUtils, HandleFileChange } from 'shared/lib/file';

import styles from './file-input.module.scss';
import { FileInputPropsI } from './index.types';

export const FileInputInline = ({
  trigger,
  onChange: { file, setValue, setError, clearErrors },
  accept,
  className,
}: FileInputPropsI) => {
  const [preview, setPreview] = useState<string>();

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      await HandleFileChange({
        inputFiles: e.target.files && Array.from(e.target.files),
        setValue,
        clearErrors,
      });
    },
    [clearErrors, setError, setValue],
  );

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

  const triggerFileRemove = () => {
    setValue('file', undefined);
    clearErrors('file');
    trigger('file');
  };

  useEffect(() => {
    if (file) {
      (async () => {
        const dataURL = await FileUtils.blobToDataURL(file);
        setPreview(dataURL);
        trigger('file');
      })();
    }
  }, [file]);

  if (file) {
    return (
      <div className={cs(styles.uploaded, className)}>
        {preview && <img className={styles.preview} src={preview} loading="lazy" alt="" />}
        <p className={styles.file_name}>{file?.name.substring(0, 12)}</p>
        <div className={styles.emu_btn} onClick={triggerFileRemove}>
          <UploadBrakeSvg className={styles.ico_upload_brake} />
          <p className={styles.text}>
            <Trans>Remove File</Trans>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div {...getRootProps()} className={cs('w-full', className)}>
      <input {...getInputProps()} onChange={onChange} type="file" className={styles.hiden} />
      <button className={cs(styles.upload, className)} type="button" onClick={open}>
        <div className={styles.emu_btn}>
          <UploadBrakeSvg className={styles.ico_upload_brake} />
          <p className={styles.text}>
            <Trans>Drag and drop or Choose file</Trans>
          </p>
        </div>
      </button>
    </div>
  );
};
