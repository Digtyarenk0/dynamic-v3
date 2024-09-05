import cs from 'classnames';

import styles from './button-text.module.scss';

export interface ButtonProps {
  className?: string;
  text: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event?: React.SyntheticEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export function ButtonText({ onClick, text, disabled, className }: ButtonProps) {
  return (
    <button className={cs(className, styles.button)} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
