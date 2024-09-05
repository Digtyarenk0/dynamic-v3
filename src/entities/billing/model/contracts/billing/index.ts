import { t } from '@lingui/macro';
import { parseUnits, Signer } from 'ethers';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { AppConfig } from 'shared/config/envs';
import { amplitudeEvents } from 'shared/lib/amplitude';

import { EVMWallet } from 'entities/wallet/model/types/types';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

import { fetchUserBillingAmountAction } from '../../service/fetch-billing-amount/fetch-billing-amount';

import { useBillingProviderContract } from './index.provider';

export const useBillingContract = () => {
  const dispatch = useDispatch();

  const billing = useBillingProviderContract();

  const contract = useCallback(async (signer: Signer) => {
    const { TrustlessBilling__factory } = await import('./typechain/TrustlessBilling__factory');
    return TrustlessBilling__factory.connect(AppConfig.contracts.billing.billingContract, signer);
  }, []);

  const switchToTrustfulBilling = useCallback(
    async (signer: Signer) => {
      try {
        const factory = await contract(signer);
        const tx = await factory.switchToTrustfulBilling();
        return tx;
      } catch (error: any) {
        console.error('trustlessBillingCancelled', { error });
      }
    },
    [contract],
  );

  const requestTrustlessBilling = useCallback(
    async (wallet: EVMWallet) => {
      try {
        const factory = await contract(wallet.signer);
        const tx = await factory.requestTrustlessBilling();
        return tx;
      } catch (error: any) {
        console.error('trustlessBillingCancelled', { error });
      }
    },
    [contract],
  );

  const topUp = useCallback(
    async (wallet: EVMWallet, amount: string, dec: number) => {
      try {
        dispatch(loaderReducerActions.set(t`Top up`));
        const value = parseUnits(amount.toString(), dec);
        const factory = await contract(wallet.signer);
        const txTopUp = await factory.topUp(value);
        dispatch(loaderReducerActions.set(t`Waiting for transaction execution`));
        await txTopUp.wait();
        dispatch(loaderReducerActions.end());
        amplitudeEvents.billing.deposit_success({ value: Number(amount) });
        toast.success(t`Top up completed`);
        dispatch(fetchUserBillingAmountAction.call());
        await billing.dispatchUserBalanceUsaged(wallet.account.toLowerCase(), dec);
        await billing.dispatchUserStatus(wallet.account.toLowerCase());
        await billing.dispatchUserWithdrawalStatus(wallet.account.toLowerCase());
      } catch (error: any) {
        if (error?.code === 'ACTION_REJECTED') {
          toast.error(t`User rejected action`);
        }
        console.error('topup', { error });
        dispatch(loaderReducerActions.end());
      }
    },
    [contract],
  );

  const requestWithdrawal = useCallback(
    async (wallet: EVMWallet) => {
      try {
        dispatch(loaderReducerActions.set(t`Request withdrawal`));
        const factory = await contract(wallet.signer);
        const tx = await factory.requestWithdrawal();
        dispatch(loaderReducerActions.end());
        tx.wait();
        toast.success(t`Withdrawal request send`);
        return tx;
      } catch (error: any) {
        console.error('requestWithdrawal', { error });
        if (error?.code === 'ACTION_REJECTED') {
          toast.error(t`User rejected action`);
        }
        dispatch(loaderReducerActions.end());
      }
    },
    [contract],
  );

  const withdraw = useCallback(
    async (wallet: EVMWallet, amount: string) => {
      try {
        dispatch(loaderReducerActions.set(t`Withdraw`));
        const factory = await contract(wallet.signer);
        const tx = await factory.withdraw(amount);
        dispatch(loaderReducerActions.end());
        tx.wait();
        amplitudeEvents.billing.withdrawal_success({ value: Number(amount) });
        toast.success(t`Withdrawal completed`);
        dispatch(fetchUserBillingAmountAction.call());
        await billing.dispatchUserStatus(wallet.account.toLowerCase());
        await billing.dispatchUserWithdrawalStatus(wallet.account.toLowerCase());
        return tx;
      } catch (error: any) {
        console.error('withdraw', { error });
        if (error?.code === 'ACTION_REJECTED') {
          toast.error(t`User rejected action`);
        }
        dispatch(loaderReducerActions.end());
      }
    },
    [contract],
  );

  const cancelWithdrawal = useCallback(
    async (wallet: EVMWallet) => {
      try {
        dispatch(loaderReducerActions.set(t`Canceling withdraw`));
        const factory = await contract(wallet.signer);
        const tx = await factory.cancelWithdrawal();
        tx.wait();
        dispatch(loaderReducerActions.end());
        toast.success(t`Canceling completed`);
        return tx;
      } catch (error: any) {
        if (error?.code === 'ACTION_REJECTED') {
          toast.error(t`User rejected action`);
        }
        dispatch(loaderReducerActions.end());
      }
    },
    [contract],
  );

  const canUseService = useCallback(
    async (wallet: EVMWallet) => {
      const factory = await contract(wallet.signer);
      return await factory.canUseService(wallet.account);
    },
    [contract],
  );

  const canPayTheAmount = useCallback(
    async (wallet: EVMWallet, amount: string) => {
      const factory = await contract(wallet.signer);
      return await factory.canPayTheAmount(wallet.account, amount);
    },
    [contract],
  );

  const canWithdraw = useCallback(
    async (wallet: EVMWallet) => {
      dispatch(loaderReducerActions.set('canWithdraw'));
      const factory = await contract(wallet.signer);
      const result = await factory.canWithdraw(wallet.account);
      dispatch(loaderReducerActions.end());
      toast.success('end');
      return result;
    },
    [contract],
  );

  return {
    topUp,
    switchToTrustfulBilling,
    requestTrustlessBilling,
    withdraw,
    requestWithdrawal,
    cancelWithdrawal,
    canUseService,
    canPayTheAmount,
    canWithdraw,
  };
};
