import { UseFormRegisterReturn } from 'react-hook-form';

export interface RangeInputProps {
  register: UseFormRegisterReturn;
  title: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}
