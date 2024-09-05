import cs from 'classnames';
import React, { forwardRef, useId } from 'react';

import styles from './radio.module.scss';

export interface RadioBoxProps {
  text: string;
  value: string;
  name: string;
  onChange: (e: any) => void;
  className?: string;
}

// eslint-disable-next-line react/display-name
export const RadioInput = forwardRef<HTMLInputElement, RadioBoxProps>((props, ref) => {
  const id = useId();
  const { className, name, text, value, onChange } = props;
  return (
    <label htmlFor={id} className={cs(className, styles.container)}>
      <input ref={ref} onChange={onChange} name={name} id={id} value={value} type="radio" className={styles.radio} />
      <span className={styles.checkmark}>{text}</span>
    </label>
  );
});
