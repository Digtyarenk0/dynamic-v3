import { UseFormSetError, UseFormClearErrors, UseFormSetValue, UseFormRegister, UseFormTrigger } from 'react-hook-form';

export interface FileInputPropsI {
  register: UseFormRegister<any>;
  trigger: UseFormTrigger<any>;
  onChange: {
    file: File | undefined;
    setError: UseFormSetError<any>;
    setValue: UseFormSetValue<any>;
    clearErrors: UseFormClearErrors<any>;
  };
  accept: { [key: string]: string[] };
  isRequired?: boolean;
  className?: string;
}
