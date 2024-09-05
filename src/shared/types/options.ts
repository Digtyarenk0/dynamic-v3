import { Lists } from 'entities/request';

const blockchainList = {
  ethereum: Lists.BlockchainList.ethereum,
  polygon: Lists.BlockchainList.polygon,
  solana: Lists.BlockchainList.solana,
  missing: 'missing',
};

const platformsList = {
  watermark: Lists.PlatformList.watermark,
  rarible: Lists.PlatformList.rarible,
  opensea: Lists.PlatformList.opensea,
  missing: 'missing',
};

const methodList = {
  extract: 'extract',
  extractBatch: 'extractBatch',
  embed: 'embed',
  embedBatch: 'embedBatch',
  extractRarible: 'extractRarible',
};

const statusesList = {
  uploading: 'uploading',
  uploaded: 'uploaded',

  payment: 'payment',
  paid: 'paid',

  checking: 'checking',
  checked: 'checked',
  detected: 'detected',

  watermarking: 'watermarking',
  watermarked: 'watermarked',

  minting: 'minting',
  minted: 'minted',

  registration: 'registration',
  registered: 'registered',

  deprecated: 'deprecated',
  failed: 'failed',
};

const fileContentTypes = {
  image: 'image',
  audio: 'audio',
  video: 'video',
  unsup: 'unsup',
};

const acceptFileFormats = {
  image: {
    mime: ['image/png', 'image/jpeg', 'image/bmp'],
    ext: ['.png', '.jpeg', '.jpg', '.bmp'],
  },
  audio: {
    mime: ['audio/wav', 'audio/x-wav', 'audio/wave'],
    ext: ['.wav'],
  },
  video: {
    mime: ['video/mp4'],
    ext: ['.mp4'],
  },
};

export const AppOptions = {
  blockchainList,
  platformsList,
  methodList,
  statusesList,
  fileContentTypes,
  acceptFileFormats,
};
