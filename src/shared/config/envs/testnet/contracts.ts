import { ConfigContracts } from '../type';

export const contracts: ConfigContracts = {
  // Billing
  billing: {
    billingContract: '0x6e945C6A818D405236AFF8A69574a05ddB95180a',
    token: {
      symbol: 'USDT',
      billingTokenContract: '0x9B898294ADDe27C4d8f3437d15Fb2c015d109A48',
    },
  },

  // Register
  register: {
    contract: '',
    admin: '',
  },

  // Watermark
  watermark: {
    polygon: {
      nftFactoryContract: '',
    },
  },
};
