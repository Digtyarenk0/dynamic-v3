import bs58 from 'bs58';

import { AppConfig } from 'shared/config/envs';
import { Env } from 'shared/config/envs/type';

import { BlockchainNamesList, SupportChains } from 'entities/request/model/types/request/request.lists';

export const prepareSolanaAddressToRegistry = (address: string, tokenId: string) => {
  const contractAddress = bs58.decode(address);
  const id = bs58.decode(tokenId);
  return {
    id,
    contractAddress,
  };
};

export const getBlockchainByChainId = (chain: BlockchainNamesList): SupportChains => {
  switch (chain) {
    case BlockchainNamesList.solana:
    case BlockchainNamesList.solana_dev:
      return BlockchainNamesList.solana;
    case BlockchainNamesList.ethereum:
    case BlockchainNamesList.sepolia:
      return BlockchainNamesList.ethereum;
    case BlockchainNamesList.polygon:
    case BlockchainNamesList.amoy:
      return BlockchainNamesList.polygon;
    default:
      return BlockchainNamesList.ethereum;
  }
};

export const getBlockchainNameByInstance = (chain: BlockchainNamesList): BlockchainNamesList => {
  const isMainnet = AppConfig.net === Env.mainnet;
  switch (chain) {
    case BlockchainNamesList.polygon:
    case BlockchainNamesList.amoy:
      return isMainnet ? BlockchainNamesList.polygon : BlockchainNamesList.amoy;
    case BlockchainNamesList.ethereum:
    case BlockchainNamesList.sepolia:
      return isMainnet ? BlockchainNamesList.ethereum : BlockchainNamesList.sepolia;
    case BlockchainNamesList.solana:
    case BlockchainNamesList.solana_dev:
      return isMainnet ? BlockchainNamesList.solana : BlockchainNamesList.solana_dev;
    default:
      return BlockchainNamesList.polygon;
  }
};
