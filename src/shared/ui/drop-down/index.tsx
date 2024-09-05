import cs from 'classnames';

import styles from './drop-down.module.scss';
import { DropDownProps } from './index.types';

export const DropDown = ({ className, active, setActive, children }: DropDownProps) => (
  <div className={cs(className, styles.dropDown, active && styles.dropDownActive)} onClick={(e) => e.stopPropagation()}>
    <div className={styles.container}>{children}</div>
    <div
      className={cs(styles.dropDown_overviwe, active && styles.dropDown_overviweActive)}
      onClick={() => setActive(false)}
    />
  </div>
);
