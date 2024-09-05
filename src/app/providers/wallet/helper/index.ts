import { Wallet } from '@dynamic-labs/sdk-react-core';
import { BrowserProvider } from 'ethers';

import { DynamicAccountType } from '../types/verified-credentials';

export const getDynamicUserAccountType = (session?: any): DynamicAccountType => {
  const zerodev = session?.find((i: any) => i?.walletName === 'zerodev');
  //   const embedWallet = session.find(
  //     // @ts-ignore
  //     (i) => i?.wallet_provider === 'embeddedWallet',
  //   ) as VerifiedCredentialEmbedWallet | undefined;
  //   // @ts-ignore
  //   const web3 = session.find((i) => i?.wallet_provider === 'browserExtension') as VerifiedCredentialWeb3 | undefined;

  if (zerodev) return 'zerodev';
  return 'web3';
};

export const dynamicEthersV6 = async (wallet: Wallet): Promise<BrowserProvider> => {
  // @ts-ignore
  const publicClient = await wallet.getPublicClient();
  // @ts-ignore
  const walletClient = await wallet.getWalletClient();
  if (!publicClient || !walletClient) {
    throw new Error('Wallet is not connected, cannot create ethers provider');
  }
  const { chain } = publicClient;
  let _a, _b;
  const network = {
    chainId: chain === null || chain === void 0 ? void 0 : chain.id,
    ensAddress:
      (_b =
        (_a = chain === null || chain === void 0 ? void 0 : chain.contracts) === null || _a === void 0
          ? void 0
          : _a.ensRegistry) === null || _b === void 0
        ? void 0
        : _b.address,
    name: chain === null || chain === void 0 ? void 0 : chain.name,
  };
  return new BrowserProvider(walletClient.transport, network);
};
