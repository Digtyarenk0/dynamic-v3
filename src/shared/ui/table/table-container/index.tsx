import cs from 'classnames';
import React, { ReactElement } from 'react';

import styles from './table.module.scss';

interface TableProps {
  children?: ReactElement[] | ReactElement;
  className?: string;
}
export const TableContainer = ({ children, className }: TableProps) => {
  return <div className={cs(styles.wrap, className)}>{children}</div>;
};
