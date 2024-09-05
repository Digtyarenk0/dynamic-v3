import classNames from 'classnames';
import { memo } from 'react';

import { Text } from 'shared/ui';

interface PageProps {
  number: number;
  active: boolean;
  toPage: () => void;
}

export const PaginationItem = memo(({ number, active, toPage }: PageProps) => (
  <div
    onClick={toPage}
    className={classNames(
      'flex items-center justify-center w-10 h-[42px] cursor-pointer',
      active && 'rounded-lg bg-grey bg-opacity-[15%]',
    )}
  >
    <Text color={active ? 'primary' : 'grey'} type="s14px-h24px" family="inter-semi-bold" text={number} />
  </div>
));
