import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { ZeroDevSmartWalletConnectors } from '@dynamic-labs/ethereum-aa';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { ReactNode } from 'react';

const environmentId = process.env.REACT_APP_DYNAMIC_ID as string;

export const DynamicProvider = ({ children }: { children: ReactNode }) => (
  <DynamicContextProvider
    theme={'dark'}
    settings={{
      // TODO: activate
      walletConnectors: [EthereumWalletConnectors, ZeroDevSmartWalletConnectors],
      // walletConnectors: [EthereumWalletConnectors],
      environmentId,
    }}
  >
    {children}
  </DynamicContextProvider>
);
