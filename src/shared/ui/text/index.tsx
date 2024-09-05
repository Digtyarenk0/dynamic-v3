import cx from 'classnames';
import { memo } from 'react';

import styles from './text.module.scss';

export type TextType =
  | 's12px-h14px'
  | 's12px-h18px'
  | 's14px-h24px'
  | 's16px-h18px'
  | 's16px-h24px'
  | 's18px-h20px'
  | 's18px-h24px'
  | 's24px-h26px'
  | 's32px-h36px'
  | 's48px-h54px';

type Theme =
  | 'white'
  | 'primary'
  | 'grey'
  | 'grey-o64'
  | 'grey-o50'
  | 'green'
  | 'green-alert'
  | 'accent'
  | 'yellow'
  | 'blue';

type Pt = 'pt-regular' | 'pt-bold';
type Inter = 'inter-regular' | 'inter-medium' | 'inter-semi-bold' | 'inter-bold';
type FamilyType = Pt | Inter;

type Align = 'left' | 'center' | 'right';

export type TextProps = {
  text?: string | number;
  type?: TextType;
  className?: string;
  align?: Align;
  color?: Theme;
  family?: FamilyType;
};

export const Text = memo(function Text(props: TextProps) {
  const { text, className, type = 's14px-h24px', align = 'left', color = 'white', family = 'inter-medium' } = props;

  const style = {
    [styles[`text--type--${type}`]]: type,
    [styles[`text--align--${align}`]]: align,
    [styles[`text--color--${color}`]]: color,
    [styles[`text--family--${family}`]]: family,
  };

  return <p className={cx(style, className)}>{text}</p>;
});
