import cs from 'classnames';
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import { useOnClickOutside } from 'shared/lib/hooks/click-outside/useOnClickOutside';
import { useHover } from 'shared/lib/hooks/use-hover/use-hover';

import { SelectContext } from '../selectContext';
import { SelectPropsI, UpdateSelectedOptionI } from '../types';

import { OptionsContainer } from './options-container';
import stylesMini from './select.mini.module.scss';
import stylesDefault from './select.module.scss';

export const Select = memo((props: SelectPropsI) => {
  const {
    options,
    selectedOption,
    setSelectedOption,
    title,
    orderDefaultValue = 0,
    placeholder = 'Choose an option',
    styleMini = false,
    className,
    classNameContainer,
    classNameOptions,
    classNameP,
  } = props;

  const selectContainerRef = useRef<HTMLDivElement>(null);

  const [optionText, setOptionText] = useState(options[orderDefaultValue].text);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHover, events] = useHover();

  const showDropdownHandler = () => setShowDropdown(!showDropdown);
  const clickOutsideHandler = () => setShowDropdown(false);

  useOnClickOutside(selectContainerRef, clickOutsideHandler);

  const updateSelectedOption = useCallback(
    ({ text, value }: UpdateSelectedOptionI) => {
      setSelectedOption(value);
      setOptionText(text);
      setShowDropdown(false);
    },
    [setSelectedOption],
  );

  const context = useMemo(
    () => ({ isHover, selectedOption, changeSelectedOption: updateSelectedOption }),
    [selectedOption, updateSelectedOption, isHover],
  );
  const styles = useMemo(() => (styleMini ? stylesMini : stylesDefault), [styleMini]);

  return (
    <SelectContext.Provider value={context}>
      <div
        className={cs(className, styles.select_container, showDropdown && styles.select_containerActive)}
        ref={selectContainerRef}
        onClick={showDropdownHandler}
      >
        <div className={cs(classNameContainer, styles.select)}>
          <div className={cs(styles.text)}>
            <label id={title} className={styles.title}>
              {title}
            </label>
            <p id={title} className={cs(classNameP, styles.value)}>
              {options.length > 0 ? optionText : placeholder}
            </p>
          </div>
          {showDropdown && (
            <OptionsContainer
              options={options}
              isMiniStyle={styleMini}
              classNameOptions={classNameOptions}
              showDropdown={showDropdown}
              onMouseEnter={events.onMouseEnter}
              onMouseLeave={events.onMouseLeave}
              updateSelectedOption={updateSelectedOption}
            />
          )}
        </div>
      </div>
    </SelectContext.Provider>
  );
});
