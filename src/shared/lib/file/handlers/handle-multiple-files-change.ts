import { t } from '@lingui/macro';
import { UseFormSetError, UseFormSetValue, UseFormClearErrors, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';

import { endNameCut } from '../file-helpers';
import { verifications } from '../files-verification';

interface HandleFileChangePropsI {
  inputFiles: File[] | null;
  setError: UseFormSetError<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

interface HandleMultipleFilesChangeAddMoreI extends HandleFileChangePropsI {
  formFiles: any[];
}

export const HandleMultipleFilesChange = async ({
  inputFiles,
  setError,
  setValue,
  clearErrors,
}: HandleFileChangePropsI) => {
  if (!inputFiles?.length) {
    setError('files', {
      message: t`You seem to have forgotten to select content`,
    });
  } else {
    const { errors, files } = await verifications(inputFiles);
    if (errors?.length) {
      errors.map((e) => toast.error(`${endNameCut(e.file.name, 25)} ${e.error.message}`));
    }
    if (!files.length) {
      setError('files', {
        message: errors[0].error.message,
      });
    } else {
      clearErrors();
      if (inputFiles.length > 20) {
        toast.error(t`Maximum number of files 20`);
      }
      const formFile = files.map((el: File) => ({ file: el, formFilled: false })).slice(0, 20);
      setValue('files', formFile);
    }
  }
};

export const HandleMultipleFilesChangeAddMore = async ({
  inputFiles,
  formFiles,
  setError,
  setValue,
  clearErrors,
}: HandleMultipleFilesChangeAddMoreI) => {
  if (formFiles.length === 20) {
    return toast.error(t`Maximum number of files 20`);
  }
  if (!inputFiles?.length) {
    setError('files', {
      message: t`You seem to have forgotten to select content`,
    });
  } else {
    const { errors, files } = await verifications(inputFiles);
    if (errors?.length) {
      errors.map((e) => toast.error(`${endNameCut(e.file.name, 25)} ${e.error.message}`));
    }
    if (!files.length) {
      setError('files', {
        message: errors[0].error.message,
      });
    } else {
      clearErrors('files');
      const maxFilex = files.map((el: File) => ({ file: el, formFilled: false }));
      const valueFiles = [...formFiles, ...maxFilex].slice(0, 20);
      setValue('files', valueFiles);
    }
  }
};
