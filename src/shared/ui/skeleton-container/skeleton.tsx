import classNames from 'classnames';
import { CSSProperties, memo } from 'react';

import cls from './skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
  const { className, height, width, border } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div className={classNames('w-full h-[50px] relative overflow-hidden', cls.skeleton, className)} style={styles} />
  );
});
