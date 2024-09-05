import cs from 'classnames';
import { HTMLAttributes } from 'react';

import styles from './loader-element.module.scss';

type LoaderElementProps = HTMLAttributes<HTMLDivElement>;

export const LoaderElement = (props: LoaderElementProps) => {
  return (
    <div {...props} className={cs(styles.loader, props?.className)}>
      <div className={styles.loader_content}>
        <div className={styles.loader_container}>
          <div className={styles.loader_4}></div>
        </div>
      </div>
    </div>
  );
};
