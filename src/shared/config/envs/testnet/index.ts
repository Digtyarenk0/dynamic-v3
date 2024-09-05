import { baseConfig } from '../base';
import { Env, Config } from '../type';

import { chains } from './chains';
import { contracts } from './contracts';
import { platforms } from './platforms';

export const testnetConfig: Config = {
  ...baseConfig,
  net: Env.testnet,
  network: 80002, // for walletconnect network
  name: 'amoy',
  chains,
  contracts,
  platforms,
};
