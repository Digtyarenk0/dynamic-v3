import { setUserId } from '@amplitude/analytics-browser';
import { t } from '@lingui/macro';
import cs from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useWallet } from 'app/providers/wallet';

import WalletSvg from 'shared/assets/icons/wallet.svg';
import { AppConfig } from 'shared/config/envs';
import { useBillingTokenNodeContract } from 'shared/lib/contracts/token/index.node';
import { delay } from 'shared/lib/utils/delay';
import { Text, DropDown } from 'shared/ui';

import { useBillingProviderContract } from 'entities/billing/model/contracts/billing/index.provider';
import {
  selectUserBillingAmount,
  selectUserBillingBalance,
  selectUserWithdrawalStatus,
} from 'entities/billing/model/selectors/billing-selectors';
import { fetchUserBillingAmountAction } from 'entities/billing/model/service/fetch-billing-amount/fetch-billing-amount';
import { WithdrawalStatus } from 'entities/billing/model/types/billing-contracts';
import { selectParsingQueries } from 'entities/request/model/selectors/slice-selector';
import { selectUseEmail } from 'entities/user/model/selectors/userSelectors';

import { ProfileDropDownContent } from '../profile-drop-down/profile';

import styles from './authorized.module.scss';

export const Authorized = () => {
  const dispatch = useDispatch();
  const token = useBillingTokenNodeContract();
  const billing = useBillingProviderContract();
  const { wallet, connector, activeChain, switchChain } = useWallet();

  const [open, setOpen] = useState(false);

  const mintingQueries = useSelector(selectParsingQueries);
  const userEmail = useSelector(selectUseEmail);
  const withdrawalStatus = useSelector(selectUserWithdrawalStatus);
  const amount = useSelector(selectUserBillingAmount);
  const selectBalance = useSelector(selectUserBillingBalance);

  const walletAddress = useMemo(() => wallet?.account, [wallet?.account]);
  const name = useMemo(() => userEmail && userEmail.split('@')[0], [userEmail]);
  const balance = useMemo(() => {
    const balance = amount && selectBalance?.toString();
    return `${balance || '-'} ${AppConfig.contracts.billing.token.symbol}`;
  }, [amount, selectBalance]);

  const isNotActiveWithdrawal =
    withdrawalStatus === WithdrawalStatus.REQUESTED || withdrawalStatus === WithdrawalStatus.APPROVED;
  // display if user withdrawal status !active

  const openDropDown = () => setOpen(true);
  const connect = () => {
    connector.activate();
    // dispatch(walletEVMConnectAction.call());
  }; // TODO: Connect

  useEffect(() => {
    (async () => {
      if (walletAddress) {
        setUserId(walletAddress);
        dispatch(fetchUserBillingAmountAction.call());
        await billing.dispatchUserStatus(walletAddress);
        await billing.dispatchUserWithdrawalStatus(walletAddress);
        await billing.listenEvents(walletAddress);
      }
    })();
  }, [walletAddress]);

  useEffect(() => {
    (async () => {
      if (walletAddress && amount) {
        const decimals = await token.decimals();
        await billing.dispatchUserBalanceUsaged(walletAddress, decimals);
      }
    })();
  }, [amount, walletAddress]);

  useEffect(() => {
    billing.putToStoreTokenDecimals();
  }, []);

  const isIncorectNetwork = activeChain === AppConfig.network;

  return (
    <ul className="flex items-center pl-0">
      <div className="flex mr-6">
        <div className="relative flex items-center">
          {walletAddress ? (
            <button className={cs('flex flex-col items-end pr-2', styles.tringle)} onClick={openDropDown}>
              <Text
                family="inter-medium"
                type="s16px-h24px"
                color="grey"
                className="block max-w-[150px] line-clamp-1 overflow-hidden text-ellipsis"
                text={name}
              />
              <Text
                family="inter-semi-bold"
                type="s12px-h18px"
                color="grey-o50"
                className="max-w-[150px] line-clamp-1 overflow-hidden text-ellipsis"
                text={balance}
              />
              {isNotActiveWithdrawal && (
                <Text
                  family="inter-semi-bold"
                  type="s12px-h18px"
                  color="grey-o50"
                  className="w-max absolute -bottom-4 -right-7"
                  text={t`Withdrawal is in progress`}
                />
              )}
            </button>
          ) : (
            <button
              className={'px-2 flex items-center duration-[0.2s] hover:brightness-50'}
              onClick={isIncorectNetwork ? connect : () => switchChain(AppConfig.network)}
            >
              <WalletSvg className="mr-2 w-4" viewBox="0 0 21 21" />
              <Text
                family="inter-medium"
                type="s12px-h14px"
                color="grey"
                text={isIncorectNetwork ? t`Connect wallet` : t`Сhange network`}
              />
            </button>
          )}
          {open && walletAddress ? (
            <DropDown className="-left-[200px] !top-[55px]" active={open} setActive={setOpen}>
              <ProfileDropDownContent balance={balance} walletAddress={walletAddress} setDropDownOpen={setOpen} />
            </DropDown>
          ) : undefined}
        </div>
      </div>
    </ul>
  );
};
