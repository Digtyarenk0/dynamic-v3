import Big from 'big.js';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { store } from 'app/providers/store/store';

import { AppConfig } from 'shared/config/envs';
import { useBillingTokenNodeContract } from 'shared/lib/contracts/token/index.node';

import { walletSelectors } from 'entities/wallet/model/selectors/selector';

import { formatUserBalanceUsage } from 'features/authorization/model/helper/billing';

import { fetchUserBillingAmountAction } from '../../service/fetch-billing-amount/fetch-billing-amount';
import { billingReducerActions } from '../../slice/billing-slice';
import { BillingUser, WithdrawalStatus } from '../../types/billing-contracts';

export const useBillingProviderContract = () => {
  const dispatch = useDispatch();
  const token = useBillingTokenNodeContract();

  const provider = useSelector(walletSelectors.selectProvider);
  const wsProvider = useSelector(walletSelectors.selectWSProvider);

  const contract = useCallback(async (wsConnect = false) => {
    const { TrustlessBilling__factory } = await import('./typechain/TrustlessBilling__factory');
    return TrustlessBilling__factory.connect(
      AppConfig.contracts.billing.billingContract,
      wsConnect ? wsProvider : provider,
    );
  }, []);

  const putToStoreTokenDecimals = useCallback(async () => {
    const decimals = await token.decimals();
    dispatch(billingReducerActions.setTokenDecimal(decimals));
  }, []);

  const eventTopUp = useCallback(
    async (account: string) => {
      const factory = await contract(true);
      const decimals = await token.decimals();
      factory.on(factory.filters.TopUp, async (address: string) => {
        if (account.toLowerCase() === address.toLowerCase()) {
          dispatch(billingReducerActions.setNotEnoughBalance(false));
          dispatch(fetchUserBillingAmountAction.call());
          await dispatchUserBalanceUsaged(account.toLowerCase(), decimals);
          await dispatchUserStatus(account.toLowerCase());
        }
      });
    },
    [contract, dispatch, token],
  );

  const eventStatusChangeConfirmed = useCallback(
    async (account: string) => {
      const factory = await contract(true);
      factory.on(
        factory.filters.StatusChangeConfirmed,
        async (confirmedWithdrawalStatusChangeUsers: string[], confirmedBillingStatusChangeUsers: string[]) => {
          const isWithdrowal = confirmedWithdrawalStatusChangeUsers.find(
            (a) => a.toLowerCase() === account.toLowerCase(),
          );
          const isBilling = confirmedBillingStatusChangeUsers.find((a) => a.toLowerCase() === account.toLowerCase());
          isBilling && dispatchUserStatus(account.toLowerCase());
          isWithdrowal && dispatchUserWithdrawalStatus(account.toLowerCase());
        },
      );
    },
    [contract],
  );

  const eventTrustlessBillingRequested = useCallback(
    async (account: string) => {
      const factory = await contract(true);
      factory.on(factory.filters.TrustlessBillingRequested, async (address: string) => {
        if (account.toLowerCase() === address.toLowerCase()) {
          await dispatchUserStatus(address.toLowerCase());
        }
      });
    },
    [contract],
  );

  const eventTrustlessBillingCancelled = useCallback(
    async (account: string) => {
      const factory = await contract(true);
      factory.on(factory.filters.TrustlessBillingCancelled, async (address: string) => {
        if (account.toLowerCase() === address.toLowerCase()) {
          dispatchUserStatus(address.toLowerCase());
        }
      });
    },
    [contract],
  );

  const eventWithdraw = useCallback(
    async (account: string) => {
      const factory = await contract(true);
      const decimals = await token.decimals();
      factory.on(factory.filters.Withdraw, async (address: string) => {
        if (account.toLowerCase() === address.toLowerCase()) {
          dispatch(fetchUserBillingAmountAction.call());
          await dispatchUserWithdrawalStatus(account.toLowerCase());
          await dispatchUserBalanceUsaged(account.toLowerCase(), decimals);
        }
      });
    },
    [contract],
  );

  const eventWithdrawalRequested = useCallback(
    async (account: string) => {
      const factory = await contract(true);
      factory.on(factory.filters.WithdrawalRequested, (address: string) => {
        if (account.toLowerCase() === address.toLowerCase()) {
          dispatchUserWithdrawalStatus(account.toLowerCase());
        }
      });
    },
    [contract],
  );

  const eventWithdrawalCancelled = useCallback(
    async (account: string) => {
      const factory = await contract(true);
      factory.on(factory.filters.WithdrawalCancelled, (address: string) => {
        if (account.toLowerCase() === address.toLowerCase()) {
          dispatchUserWithdrawalStatus(account.toLowerCase());
        }
      });
    },
    [contract],
  );

  const eventPaymentExecuted = useCallback(
    async (account: string) => {
      const factory = await contract(true);
      const decimals = await token.decimals();
      factory.on(factory.filters.PaymentExecuted, async () => {
        dispatch(fetchUserBillingAmountAction.call());
        await dispatchUserBalanceUsaged(account, decimals);
      });
    },
    [contract],
  );

  const listenEvents = useCallback(
    async (account: string) => {
      await eventStatusChangeConfirmed(account);
      await eventTrustlessBillingRequested(account);
      await eventTrustlessBillingCancelled(account);
      await eventWithdrawalCancelled(account);
      await eventWithdrawalRequested(account);
      await eventTopUp(account);
      await eventWithdraw(account);
      await eventPaymentExecuted(account);
    },
    [contract],
  );

  const users = useCallback(
    async (address: string): Promise<BillingUser> => {
      const factory = await contract();
      const res = await factory.users(address);
      const user: BillingUser = {
        balance: res.balance.toString(),
        paidAmount: res.paidAmount.toString(),
        withdrawalStatus: Number(res.withdrawalStatus),
        billingStatus: Number(res.billingStatus),
      };
      return user;
    },
    [contract],
  );

  const dispatchUserStatus = useCallback(
    async (address: string): Promise<void> => {
      try {
        const { billingStatus } = await users(address);
        dispatch(billingReducerActions.setBillingStatus(billingStatus));
      } catch (error) {
        console.error('dispatchUserStatus', error);
      }
    },
    [contract],
  );

  const dispatchUserBalanceUsaged = useCallback(
    async (address: string, decimal: number): Promise<void> => {
      const amount = store.getState().billing?.amount;
      if (!amount) return;
      try {
        const bch = await users(address);
        const { balance, usaged } = formatUserBalanceUsage({
          amount: amount.toString(),
          decimal,
          balance: bch.balance.toString(),
          paidAmount: bch.paidAmount.toString(),
        });
        const currectBalance = Big(balance).minus(usaged).toNumber();
        dispatch(billingReducerActions.setBillingBalanceUsaged(currectBalance));
        dispatch(billingReducerActions.setTokenDecimal(decimal));
      } catch (error) {
        console.error('User balance usaged', error);
      }
    },
    [contract],
  );

  const dispatchUserWithdrawalStatus = useCallback(
    async (address: string): Promise<void> => {
      try {
        const { withdrawalStatus } = await users(address);
        dispatch(billingReducerActions.setBillingWithdrawalStatus(withdrawalStatus));
      } catch (error) {
        console.error('UserWithdrawalStatus', error);
      }
    },
    [contract],
  );

  return {
    users,
    putToStoreTokenDecimals,
    eventTopUp,
    eventWithdraw,
    eventPaymentExecuted,
    eventStatusChangeConfirmed,
    eventTrustlessBillingRequested,
    eventTrustlessBillingCancelled,
    eventWithdrawalCancelled,
    eventWithdrawalRequested,
    listenEvents,
    dispatchUserStatus,
    dispatchUserBalanceUsaged,
    dispatchUserWithdrawalStatus,
  };
};
