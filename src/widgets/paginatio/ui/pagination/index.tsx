import classNames from 'classnames';
import React, { memo, useCallback, useMemo, useState } from 'react';

import ChevronSVG from 'shared/assets/icons/watermarks/chevron.svg';
import { Text } from 'shared/ui';

import { getFilledNumberArray } from 'widgets/paginatio/model/helper';

import { PaginationItem } from '../pagination-item';

interface PaginationProps {
  count: number;
  loadPage: (p: number) => void;
}

export const Pagination = memo(({ count, loadPage }: PaginationProps) => {
  const [current, setCurrent] = useState(1);
  // create array count length
  const list: number[] = useMemo(() => getFilledNumberArray(count), [count]);
  const limit = 5;

  const isBack = useMemo(() => current !== 1, [list, current]);
  const isForward = useMemo(() => current !== list.length, [list, current]);

  const back = useCallback(() => {
    setCurrent(current - 1);
    loadPage(current - 1);
  }, [current]);

  const forward = useCallback(() => {
    setCurrent(current + 1);
    loadPage(current + 1);
  }, [current]);

  const next = useCallback((i: number) => {
    setCurrent(i);
    loadPage(i);
  }, []);

  const pages = useMemo(() => {
    const start = current > 1 ? current - 2 : current - 1;
    const end = current > 1 ? list[current - 1] + limit - 2 : list[current - 1] + limit - 1;
    const last = list[list.length - 1];
    const isSpread = current + 3 < last;

    const main = list
      .slice(start, end)
      .map((i) => <PaginationItem number={i} toPage={() => next(i)} active={current === i} key={i} />);

    return (
      <div className="flex mx-2">
        {main}
        {/* Spread with last page */}
        {isSpread && (
          <>
            <Text className="pt-[14px]" color="grey" type="s14px-h24px" family="inter-semi-bold" text="..." />
            <PaginationItem number={last} toPage={() => next(last)} active={current === last} key={last} />
          </>
        )}
      </div>
    );
  }, [list, current]);

  return (
    <div className="flex">
      <button
        onClick={back}
        disabled={!isBack}
        className={classNames(
          'flex justify-center items-center w-10 h-[42px] mr-2 rounded-lg',
          isBack && 'hover:bg-grey hover:bg-opacity-[15%]',
          !isBack && 'opacity-60',
        )}
      >
        <div>
          <ChevronSVG />
        </div>
      </button>
      {pages}
      <button
        onClick={forward}
        disabled={!isForward}
        className={classNames(
          'flex justify-center items-center w-10 h-[42px] mr-2 rounded-lg',
          isForward && 'hover:bg-grey hover:bg-opacity-[15%]',
          !isForward && 'opacity-60',
        )}
      >
        <div className="rotate-180">
          <ChevronSVG />
        </div>
      </button>
    </div>
  );
});
