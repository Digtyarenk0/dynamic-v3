import { BlockchainChainList } from 'entities/request/model/types/request/request.lists';

export enum Env {
  testnet = 'testnet',
  mainnet = 'mainnet',
}

export interface ConfigChains {
  ethereum: {
    chainId: BlockchainChainList.ethereum | BlockchainChainList.sepolia;
    baseScanUrl: string;
    baseScanApiUrl: string;
    infuraId: string;
    networkRpcLink: string;
  };

  polygon: {
    name: 'Polygon' | 'amoy';
    chainId: BlockchainChainList.polygon | BlockchainChainList.amoy;
    baseScanUrl: string;
    baseScanApiUrl: string;
    networkRpcLink: string;
    networkRpcLinkWS: string;
  };

  solana: {
    env: 'devnet' | 'mainnet-beta';
    baseScanUrl: string;
    chainId: BlockchainChainList.solana | BlockchainChainList.solanaDev;
    ownerProgram: string;
  };
}

export interface ConfigContracts {
  // Billing
  billing: {
    billingContract: string;
    token: {
      symbol: string;
      billingTokenContract: string;
    };
  };

  // Registry
  register: {
    contract: string;
    admin: string;
  };

  // Watermark
  watermark: {
    polygon: {
      nftFactoryContract: string;
    };
  };
}

export interface ConfigPlatforms {
  // Rarible
  rarible: {
    env: 'prod' | 'testnet';
    key: string;
    url: string;
    polygon: {
      contractAddress: string;
    };
    solana: {
      watermarkColletion: string;
    };
  };
  //  OpenSea
  opensea: {
    url: string;
    apiUrl: string;
  };
}

export interface Config {
  app_version: string;
  ipfsUrl: string;
  net: Env;
  network: number;
  // Chains
  chains: ConfigChains;
  // Contracts
  contracts: ConfigContracts;
  // Platforms
  platforms: ConfigPlatforms;

  support: {
    audio: boolean;
    video: boolean;
  };
  name: string;
}
