import cs from 'classnames';
import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Text } from '../text';

import styles from './checkbox.module.scss';

export interface CheckBoxProps {
  text: string;
  register: UseFormRegisterReturn;
  className?: string;
}

export const Checkbox = ({ className, text, register }: CheckBoxProps) => {
  const id = useId();
  return (
    <label htmlFor={id} className={cs(className, styles.container)}>
      <Text type="s14px-h24px" family="inter-medium" color="grey" text={text} />
      <input id={id} className={styles.checkbox} type="checkbox" {...register} />
      <span className={styles.checkmark} />
    </label>
  );
};
