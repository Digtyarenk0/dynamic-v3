import cs from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { RangeInputProps } from './index.types';
import styles from './range-input.module.scss';

export const RangeInput = ({ register, className, title, min = 0, max = 100, step = 1 }: RangeInputProps) => {
  const refInput = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (refInput.current?.style) {
      const fill = e.target.value || 0;
      setValue(Number(fill));
      refInput.current.style.background =
        // Fill
        `linear-gradient(to right, #3cd399 0%, #3cd399 ${fill}%, ` +
        // Free
        `rgba(110, 120, 140, 0.1) ${fill}%, rgba(110, 120, 140, 0.1) 100%)`;
    }
  };

  useEffect(() => {
    const handleEvent = () => {
      if (refInput.current?.style) {
        const fill = refInput.current.value || 0;
        setValue(Number(fill));
        refInput.current.style.background =
          // Fill
          `linear-gradient(to right, #3cd399 0%, #3cd399 ${fill}%, ` +
          // Free
          `rgba(110, 120, 140, 0.1) ${fill}%, rgba(110, 120, 140, 0.1) 100%)`;
      }
    };
    refInput.current?.addEventListener('mousemove', handleEvent);
    return () => refInput.current?.removeEventListener('mousemove', handleEvent);
  }, []);

  return (
    <div className={cs(className, styles.seek)}>
      <div className="flex justify-between mb-2">
        <p className={styles.title}>{title}</p>
        <p className={styles.current_percent}>{value}%</p>
      </div>
      <input
        {...register}
        className={styles.input}
        onChange={onChange}
        ref={(e) => {
          register.ref(e);
          // @ts-ignore
          refInput.current = e;
        }}
        type="range"
        defaultValue="0"
        min={min}
        max={max}
        step={step}
      />
      <div className="flex justify-between mt-4">
        <p className={styles.percent}>{min}%</p>
        <p className={styles.percent}>{max}%</p>
      </div>
    </div>
  );
};
