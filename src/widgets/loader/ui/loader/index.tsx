import { Trans } from '@lingui/macro';
import { useSelector } from 'react-redux';

import { selectloaderStage } from 'widgets/loader/model/selectors/loader-selectors';

import styles from './loader.module.scss';

interface LoaderProps {
  children: React.ReactNode[];
}

export const Loader = ({ children }: LoaderProps) => {
  const loaderStage = useSelector(selectloaderStage);

  return (
    <div className={styles.loader}>
      {loaderStage && (
        <div className={styles.loader_content}>
          <div className={styles.loader_container}>
            <div className={styles.loader_4}></div>
          </div>
          <div className={styles.stage}>
            <Trans id={loaderStage} />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
