import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { lazily } from 'react-lazily';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';

import { AppConfig } from 'shared/config/envs';
import { Env } from 'shared/config/envs/type';

const chains = [AppConfig.net === Env.mainnet ? polygon : polygonMumbai];
const projectId = '';

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient: configureChains(chains, [w3mProvider({ projectId })]).publicClient,
});

export const Web3ModalClient = new EthereumClient(wagmiConfig, chains);

interface Web3ModalProviderProps {
  children?: React.ReactNode;
}
const { Web3Modal } = lazily(() => import('@web3modal/react'));

// https://walletconnect.com/explorer?type=wallet
const explorerRecommendedWalletIds = [
  'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // Metamask
  '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
];

export const Web3ModalProvider = (props: Web3ModalProviderProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Web3Modal
        projectId={projectId}
        ethereumClient={Web3ModalClient}
        explorerRecommendedWalletIds={explorerRecommendedWalletIds}
        explorerExcludedWalletIds={'ALL'}
      />
      {props.children}
    </WagmiConfig>
  );
};
