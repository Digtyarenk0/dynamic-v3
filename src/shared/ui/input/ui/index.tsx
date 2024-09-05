import cs from 'classnames';
import { InputHTMLAttributes, memo, useEffect, useId, useMemo, useRef, useState } from 'react';
import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';

import CheckSvg from 'shared/assets/icons/check.svg';
import FailRedSvg from 'shared/assets/icons/fail_red.svg';

import styles from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  errors: FieldErrors;
  placeholder?: string;
  example?: string;
}

export const Input = memo(function Input(props: InputProps) {
  const { register, errors, className, placeholder = '', example = '', ...otherProps } = props;

  const uID = useId();
  const ref = useRef<HTMLInputElement>();

  const [isFocus, setIsFocus] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const onBlurCapture = () => setIsFocus(false);
  const onFocus = () => setIsFocus(true);

  const refShare = (e: HTMLInputElement) => {
    register.ref(e);
    ref.current = e;
  };

  const value = ref.current?.value;
  const error = value && errors[register.name]?.message?.toString();

  useEffect(() => {
    value || isFocus ? setIsActive(true) : setIsActive(false);
  }, [value, isFocus]);

  const ico = useMemo(() => {
    if (!value) return undefined;
    if (!error)
      return <CheckSvg fill="#3CD399" className={cs(styles.valid, styles.valid_active)} viewBox="0 0 20 20" />;
    return (
      <div className={cs(styles.valid, styles.valid_err_active)}>
        <FailRedSvg className="w-5 h-[22px]" viewBox="0 0 16 16" fill="#ff4650" />
      </div>
    );
  }, [value, error]);

  return (
    <div className={cs(styles.text_input_container, className)}>
      <input
        {...register}
        {...otherProps}
        onBlurCapture={onBlurCapture}
        onFocus={onFocus}
        id={uID}
        className={cs(styles.text_input, error && '!border-accent !border-[3px]')}
        ref={refShare}
      />

      <label className={cs(styles.placeholder, isActive && styles.placeholder_active)} htmlFor={uID}>
        {placeholder}
      </label>
      <label
        className={cs(styles.helper_example, error && '!text-accent', isFocus && styles.helper_example_active)}
        htmlFor={uID}
      >
        {error || example}
      </label>
      {ico}
    </div>
  );
});
