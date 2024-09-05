import { Trans } from '@lingui/macro';

import styles from './loader-page.module.scss';

export const LoaderPage = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader_content}>
        <div className={styles.loader_container}>
          <div className={styles.loader_4}></div>
        </div>
        <div className={styles.stage}>
          <Trans>Loading</Trans>
        </div>
      </div>
    </div>
  );
};
