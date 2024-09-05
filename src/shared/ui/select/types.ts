import { ReactElement } from 'react';

export interface SelectPropsI {
  options: OptionProps[];
  selectedOption: string;
  setSelectedOption: (value: any) => void;
  orderDefaultValue?: number;
  title?: string;
  placeholder?: string;
  styleMini?: boolean;
  className?: string;
  classNameContainer?: string;
  classNameOptions?: string;
  classNameP?: string;
}

export interface OptionProps {
  text: string | ReactElement;
  value: string;
  className?: string;
  styleMini?: boolean;
}

export interface UpdateSelectedOptionI {
  text: string | ReactElement;
  value: string;
}
