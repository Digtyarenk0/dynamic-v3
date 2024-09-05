import { useWeb3Modal } from '@web3modal/react';
import { useCallback } from 'react';

import { web3ModalApp } from '../utils/web3-modal.utils';

export const useWeb3ModalApp = () => {
  const { open } = useWeb3Modal();

  const openConnectModal = useCallback(() => open(), []);
  const getProvider = useCallback(() => web3ModalApp.getWeb3ModalProvider(), []);
  const disconnect = useCallback(() => web3ModalApp.disconnectWeb3Modal(), []);

  return {
    openConnectModal,
    getProvider,
    disconnect,
  };
};
