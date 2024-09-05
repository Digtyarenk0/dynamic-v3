import cs from 'classnames';
import React, { ReactElement } from 'react';

import styles from './table-body.module.scss';

interface TableBodyProps {
  children?: ReactElement[] | ReactElement;
  messageComponent?: ReactElement;
  className?: string;
}

export const TableBody = ({ children, messageComponent, className }: TableBodyProps) => {
  return <div className={cs(styles.table_body, className)}>{messageComponent || children}</div>;
};
