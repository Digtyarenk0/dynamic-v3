import { ConfigPlatforms } from '../type';

export const platforms: ConfigPlatforms = {
  // Rarible
  rarible: {
    env: 'testnet',
    key: '',
    url: 'https://testnet.rarible.com',
    polygon: {
      contractAddress: '0x41407B447Fb5425187A9BCA3a062644EF2410F8D',
    },
    solana: {
      watermarkColletion: '9dpDxmBb7BneboAwzyGEZwuy2BJMvWovQh44rX1bAU5E',
    },
  },

  //  OpenSea
  opensea: {
    url: 'https://testnets.opensea.io',
    apiUrl: 'https://testnets-api.opensea.io/api/v2/',
  },
};
