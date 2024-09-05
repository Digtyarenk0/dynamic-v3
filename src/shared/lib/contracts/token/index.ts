import { t } from '@lingui/macro';
import { MaxUint256, parseEther, parseUnits, Signer } from 'ethers';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { AppConfig } from 'shared/config/envs';

import { EVMWallet } from 'entities/wallet/model/types/types';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

import { ApproveTopUpProps } from './types/index.types';

export const useBillingTokenContract = () => {
  const dispatch = useDispatch();

  const contract = useCallback(async (signer: Signer) => {
    const { ERC20Mock__factory } = await import('./typechain/ERC20Mock__factory');
    return ERC20Mock__factory.connect(AppConfig.contracts.billing.token.billingTokenContract, signer);
  }, []);

  const approveTopUp = useCallback(
    async (wallet: EVMWallet, { amount, decimals, isInfinit = false }: ApproveTopUpProps) => {
      const infinite = MaxUint256.toString();
      const factory = await contract(wallet.signer);
      const result = await factory.approve(
        AppConfig.contracts.billing.billingContract,
        isInfinit ? infinite : parseUnits(amount.toString(), decimals),
      );
      return result;
    },
    [contract],
  );

  const mint = useCallback(
    async (wallet: EVMWallet) => {
      try {
        if (!wallet) return;
        const amount = '100';
        const mintAmount = parseEther('100');
        dispatch(
          loaderReducerActions.set(t`Minting ${amount} ${AppConfig.contracts.billing.token.symbol} test tokens `),
        );
        const factory = await contract(wallet.signer);
        const tx = await factory.mint(wallet.account, mintAmount);
        dispatch(loaderReducerActions.end());
        tx.wait();
        toast.success(t`Mint ${amount} ${AppConfig.contracts.billing.token.symbol} success`);
        return tx;
      } catch (error: any) {
        if (error?.code === 'ACTION_REJECTED') {
          toast.error(t`User rejected action`);
        }
        dispatch(loaderReducerActions.end());
        console.error('mint test tokens', error);
      }
    },
    [contract],
  );

  return { mint, approveTopUp };
};
