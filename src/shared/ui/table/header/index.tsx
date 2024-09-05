import cs from 'classnames';
import { memo } from 'react';

import { Text } from '../../text';

import styles from './table-header.module.scss';

interface Column {
  width: string;
  title: string;
}
interface TableHeaderProps {
  columns: Column[];
  className?: string;
}

export const TableHeader = memo(({ columns, className }: TableHeaderProps) => (
  <div className={cs(styles.table_header, className)}>
    {columns.map(({ title, width }) => (
      <div className={cs(styles.column, width)} key={title}>
        <Text
          className="w-max h-full justify-center content-center !text-[10px]"
          color="primary"
          family="inter-bold"
          text={title}
        />
      </div>
    ))}
  </div>
));
