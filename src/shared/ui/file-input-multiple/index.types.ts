import { UseFormSetError, UseFormClearErrors, UseFormSetValue } from 'react-hook-form';

export interface FileInputPropsI {
  className?: string;
  onChange: {
    setError: UseFormSetError<any>;
    setValue: UseFormSetValue<any>;
    clearErrors: UseFormClearErrors<any>;
  };
  accept: { [key: string]: string[] };
}
