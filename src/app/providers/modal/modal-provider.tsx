import classNames from 'classnames';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { ConfirmClose } from 'shared/ui/confirm-close/confirm-close';
import { ModalContainer } from 'shared/ui/modal-container';

export type ModalData = {
  children: React.ReactNode;
  title?: string;
  header?: boolean;
  className?: string;
};

export type Foo = {
  modalData?: ModalData;
  setModalData: (p: ModalData) => void;
  setConfirm: (p: boolean) => void;
  closeModal: () => void;
  closeModalConfirm: () => void;
};

const ModalContext = createContext<Foo>({
  modalData: undefined,
  setModalData: () => ({}),
  setConfirm: () => ({}),
  closeModal: () => ({}),
  closeModalConfirm: () => ({}),
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isBack, setIsBack] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>();

  const closeModalConfirm = useCallback(() => {
    setModalData(undefined);
    setConfirm(false);
    setIsBack(false);
  }, []);

  const closeModal = () => {
    if (isConfirm) {
      setIsBack(true);
    } else {
      closeModalConfirm();
    }
  };

  const back = () => {
    setIsBack(false);
  };

  const foo: Foo = useMemo(
    () => ({
      modalData,
      confirm,
      setModalData,
      setConfirm,
      closeModal,
      closeModalConfirm,
    }),
    [modalData],
  );

  useEffect(() => {
    if (isConfirm && modalData === undefined) {
      setConfirm(false);
    }
  }, [modalData, isConfirm]);

  return (
    <ModalContext.Provider value={foo}>
      {children}
      {modalData && (
        <ModalContainer
          title={modalData.title}
          className={classNames(modalData.className, isBack && 'hidden')}
          closeModal={closeModal}
          header={modalData.header}
        >
          {modalData.children}
        </ModalContainer>
      )}
      {isBack && modalData && (
        <ModalContainer
          title="Are you sure you want to close this window?"
          className={modalData.className}
          closeModal={closeModalConfirm}
        >
          <ConfirmClose back={back} closeModalConfirm={closeModalConfirm} />
        </ModalContainer>
      )}
    </ModalContext.Provider>
  );
};

const useModalContext = () => useContext(ModalContext);

export { ModalProvider, useModalContext };
