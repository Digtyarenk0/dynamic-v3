import classNames from 'classnames';
import { useState } from 'react';

import GlobeSVG from 'shared/assets/icons/language/globe.svg';
import { DropDown, Text } from 'shared/ui';

import styles from './select.module.scss';

export const LanguageSwitcher = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const lng = 'English';

  const changeLanguage = () => {
    setShowDropdown(false);
  };

  return (
    <div
      onClick={() => setShowDropdown(!showDropdown)}
      className={classNames(styles.select_container, showDropdown && styles.select_containerActive)}
    >
      <GlobeSVG className="mr-2" />
      <Text type="s12px-h18px" family="inter-semi-bold" color="primary" text={lng} />
      {showDropdown && (
        <DropDown className="!top-0" active={showDropdown} setActive={setShowDropdown}>
          <div className={classNames(styles.options, showDropdown ? styles.active : styles.hide)}>
            <button onClick={changeLanguage}>
              <Text
                className={classNames('pt-[6px] pb-[10px] px-[52px]', styles.option)}
                type="s14px-h24px"
                family="inter-regular"
                color="primary"
                text={lng}
              />
            </button>
          </div>
        </DropDown>
      )}
    </div>
  );
};
