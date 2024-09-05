import cs from 'classnames';
import { memo, useMemo } from 'react';

import CheckSvg from 'shared/assets/icons/check.svg';

import { useSelectContext } from '../selectContext';
import { OptionProps } from '../types';

import stylesMini from './option.mini.module.scss';
import stylesDefault from './option.module.scss';

interface Props extends OptionProps {
  update: (value: any) => void;
}

export const Option = memo((props: Props) => {
  const { className, text, value, update, styleMini = false } = props;
  const { isHover, selectedOption } = useSelectContext();

  const styles = useMemo(() => (styleMini ? stylesMini : stylesDefault), [styleMini]);
  const isActive = useMemo(
    () => (selectedOption === value && !isHover ? styles.check_ico_active : undefined),
    [selectedOption, isHover],
  );

  return (
    <button className={cs(className, styles.option)} onClick={update}>
      {text}
      <div className={styles.check} />
      <CheckSvg
        viewBox={styleMini ? '0 0 27 25' : undefined}
        fill="#3CD399"
        className={cs(styles.check_ico, isActive)}
      />
    </button>
  );
});
