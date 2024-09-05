export enum MethodList {
  'extract' = 'extract',
  'embed' = 'embed',
  'embedBatch' = 'embedBatch',
}

export enum MintType {
  'image' = 'image',
  'audio' = 'audio',
  'video' = 'video',
}

export enum PlatformList {
  'watermark' = 'watermark',
  'rarible' = 'rarible',
  'opensea' = 'opensea',
}

export enum BlockchainList {
  'solana' = 'solana',
  'polygon' = 'polygon',
  'ethereum' = 'ethereum',
}

export enum BlockchainNamesList {
  // Ethereum
  ethereum = 'ethereum',
  sepolia = 'sepolia',
  // Polygon
  polygon = 'polygon',
  amoy = 'amoy',
  // Solana
  solana = 'solana',
  solana_dev = 'solana_dev',
}

export enum BlockchainChainList {
  // Ethereum
  ethereum = '1',
  sepolia = '11155111',
  // Polygon
  polygon = '137',
  amoy = '80002',
  // Solana
  solana = '0x436861696e556e697175654964',
  solanaDev = '0x436861696e556e697175654964446576',
}

export type SolChain = BlockchainNamesList.solana | BlockchainNamesList.solana_dev;
export type EVMChains =
  | BlockchainNamesList.polygon
  | BlockchainNamesList.amoy
  | BlockchainNamesList.sepolia
  | BlockchainNamesList.ethereum;

export type SupportChains = EVMChains | SolChain;

export enum PreviewType {
  file = 'file',
  link = 'link',
  fromLink = 'fromLink',
}
