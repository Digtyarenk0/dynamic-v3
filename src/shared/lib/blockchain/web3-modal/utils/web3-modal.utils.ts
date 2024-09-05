import type { Connector } from '@wagmi/core';

import { Web3ModalClient } from '../Web3ModalProvider';

const getWeb3ModalConnector = async (connectorId = 'injected'): Promise<Connector> => {
  const connector = Web3ModalClient.getConnectorById(connectorId);
  return connector;
};

const getWeb3ModalProvider = async (connectorId = 'injected') => {
  const connector = await getWeb3ModalConnector(connectorId);
  const provider = await connector.getProvider();
  return provider;
};

const getChainId = async (connector: Connector): Promise<number> => {
  const chain = await connector.getChainId();
  return chain;
};

const disconnectWeb3Modal = async () => {
  try {
    Web3ModalClient.disconnect();
  } catch (error) {
    console.error('disconnectWeb3Modal', error);
  }
};

export const web3ModalApp = {
  getWeb3ModalConnector,
  getWeb3ModalProvider,
  getChainId,
  disconnectWeb3Modal,
};
