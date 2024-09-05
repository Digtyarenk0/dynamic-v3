import { CHAIN_NAMES_RPC_LINK, CHAIN_NAMES_RPC_WSS_LINK } from 'shared/constants/blockchain-maps';

import { BlockchainChainList, BlockchainNamesList } from 'entities/request/model/types/request/request.lists';

import { ConfigChains } from '../type';

export const chains: ConfigChains = {
  // ETHEREUM
  ethereum: {
    chainId: BlockchainChainList.sepolia,
    baseScanUrl: 'https://goerli.etherscan.io',
    baseScanApiUrl: 'https://api-goerli.etherscan.io',
    infuraId: '8382f072947c4e8087f3c3ed483cc325',
    networkRpcLink: CHAIN_NAMES_RPC_LINK[BlockchainNamesList.sepolia],
  },
  // Polygon
  polygon: {
    name: 'amoy',
    chainId: BlockchainChainList.amoy,
    baseScanUrl: 'https://amoy.polygonscan.com',
    baseScanApiUrl: 'https://api-testnet.polygonscan.com',
    networkRpcLink: CHAIN_NAMES_RPC_LINK[BlockchainNamesList.amoy],
    networkRpcLinkWS: CHAIN_NAMES_RPC_WSS_LINK[BlockchainNamesList.amoy],
  },
  // SOLANA
  solana: {
    env: 'devnet',
    baseScanUrl: 'https://solscan.io',
    chainId: BlockchainChainList.solanaDev,
    ownerProgram: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  },
};
