import cs from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  fluid?: boolean;
  type?: 'button' | 'submit' | 'reset';
  theme?: 'grey' | 'light' | 'green' | 'none';
  size?: 'large' | 'small';
}

export const Button = (props: ButtonProps) => {
  const { children, className, fluid = true, theme = 'grey', size = 'large', ...otherProps } = props;
  const style = {
    [styles['fluid']]: fluid,
    [styles[`theme--${theme}`]]: theme,
    [styles[`size--${size}`]]: size,
  };
  return (
    <button className={cs(style, styles.theme, className)} {...otherProps}>
      {children}
    </button>
  );
};
