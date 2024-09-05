import { UseFormSetValue, FieldValues, UseFormClearErrors } from 'react-hook-form';
import { toast } from 'react-toastify';

import { verifications } from '../files-verification';

interface HandleFileChangePropsI {
  inputFiles: File[] | null;
  setValue: UseFormSetValue<FieldValues>;
  clearErrors: UseFormClearErrors<any>;
}

export const HandleFileChange = async ({ inputFiles, setValue, clearErrors }: HandleFileChangePropsI) => {
  if (inputFiles?.length) {
    const { errors, files } = await verifications(inputFiles);
    if (!files.length) {
      toast.error(errors[0].error.message);
    } else {
      setValue('file', files[0]);
      clearErrors('file');
    }
  }
};
