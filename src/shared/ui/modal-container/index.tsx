import cs from 'classnames';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import CloseXSvg from 'shared/assets/icons/close_x.svg';

import { ModalContainerProps } from './index.types';
import styles from './modal.module.scss';

const modalContainer = document.getElementById('modal-root');

export const ModalContainer = ({
  children,
  closeModal,
  title = '',
  header = true,
  className = '',
}: ModalContainerProps) => {
  const content = (
    <div className={cs(styles.modal, children && styles.modalActive)}>
      <div
        className={cs(styles.content, className, children && styles.contentActive)}
        onClick={(e) => e.stopPropagation()}
      >
        {header && (
          <div className={styles.header}>
            <p className={styles.title}>{title}</p>
            <button className={styles.close} onClick={closeModal}>
              <CloseXSvg />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );

  useEffect(() => {
    const closeEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keyup', closeEsc);
    return () => {
      window.removeEventListener('keyup', closeEsc);
    };
  }, [closeModal]);

  // @ts-ignore
  return createPortal(content, modalContainer);
};
