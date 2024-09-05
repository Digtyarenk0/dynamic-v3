import cs from 'classnames';
import { useEffect, useMemo } from 'react';

import { Option } from '../option/option';
import { OptionProps, UpdateSelectedOptionI } from '../types';

import stylesMini from './select.mini.module.scss';
import stylesDefault from './select.module.scss';

interface OptionsContainerProps {
  isMiniStyle: boolean;
  showDropdown: boolean;
  options: OptionProps[];
  updateSelectedOption: (p: UpdateSelectedOptionI) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  classNameOptions?: string;
}

export const OptionsContainer = (props: OptionsContainerProps) => {
  const { isMiniStyle, options, classNameOptions, showDropdown, updateSelectedOption, onMouseEnter, onMouseLeave } =
    props;

  const styles = useMemo(() => (isMiniStyle ? stylesMini : stylesDefault), [isMiniStyle]);

  useEffect(() => {
    return () => {
      onMouseLeave();
    };
  }, []);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cs(styles.options, classNameOptions, showDropdown ? styles.active : styles.hide)}
    >
      {options.map(({ value, text, className }, id) => (
        <Option
          value={value}
          text={text}
          update={() => updateSelectedOption({ value, text })}
          className={className}
          styleMini={isMiniStyle}
          key={id}
        />
      ))}
    </div>
  );
};
