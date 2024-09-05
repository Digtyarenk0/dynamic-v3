import { BlockchainChainList, BlockchainNamesList } from 'entities/request/model/types/request/request.lists';

export const CHAIN_NAMES_BY_INSTANS: {
  [key: string]: boolean;
} = {
  // POL
  [BlockchainNamesList.polygon]: true,
  [BlockchainNamesList.amoy]: true,
  // ETH
  [BlockchainNamesList.ethereum]: true,
  [BlockchainNamesList.sepolia]: true,
  // NOT_EVM
  [BlockchainNamesList.solana]: false,
  [BlockchainNamesList.solana_dev]: false,
};

export const CHAIN_ID_NAME: {
  [key: string]: BlockchainNamesList;
} = {
  // POL
  [BlockchainChainList.polygon]: BlockchainNamesList.polygon,
  [BlockchainChainList.amoy]: BlockchainNamesList.amoy,
  // ETH
  [BlockchainChainList.ethereum]: BlockchainNamesList.ethereum,
  [BlockchainChainList.sepolia]: BlockchainNamesList.sepolia,
  // NOT_EVM
  [BlockchainChainList.solana]: BlockchainNamesList.solana,
  [BlockchainChainList.solanaDev]: BlockchainNamesList.solana_dev,
};

export const CHAIN_NAMES_RPC_LINK: {
  [key: string]: string;
} = {
  // POL
  [BlockchainNamesList.polygon]:
    'https://lb.drpc.org/ogrpc?network=polygon&dkey=AhjAIUax7EMFtu9ErxcXVpiZ6PHYXjMR75HdWq9OWu41',
  [BlockchainNamesList.amoy]:
    'https://lb.drpc.org/ogrpc?network=polygon-amoy&dkey=AhjAIUax7EMFtu9ErxcXVpiZ6PHYXjMR75HdWq9OWu41',
  // ETH
  [BlockchainNamesList.ethereum]: 'https://eth.llamarpc.com',
  [BlockchainNamesList.sepolia]: 'https://eth-sepolia.g.alchemy.com/v2/rUhXcFWC1eRH9cCtwXylek_sUFzuTdiH',
  // NOT_EVM
  [BlockchainNamesList.solana]: '',
  [BlockchainNamesList.solana_dev]: '',
};

export const CHAIN_NAMES_RPC_WSS_LINK: {
  [key: string]: string;
} = {
  // POL
  [BlockchainNamesList.polygon]: 'wss://polygon-mainnet.g.alchemy.com/v2/TNE4Mb51WKC3QAuiutkwVsu1yb8fWi-L',
  [BlockchainNamesList.amoy]: 'wss://polygon-amoy.g.alchemy.com/v2/TNE4Mb51WKC3QAuiutkwVsu1yb8fWi-L',
  // ETH
  [BlockchainNamesList.ethereum]: 'https://eth.llamarpc.com',
  [BlockchainNamesList.sepolia]: 'https://eth-sepolia.g.alchemy.com/v2/rUhXcFWC1eRH9cCtwXylek_sUFzuTdiH',
  // NOT_EVM
  [BlockchainNamesList.solana]: '',
  [BlockchainNamesList.solana_dev]: '',
};
