import { formatUnits } from 'ethers';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { AppConfig } from 'shared/config/envs';

import { walletSelectors } from 'entities/wallet/model/selectors/selector';

export const useBillingTokenNodeContract = () => {
  const provider = useSelector(walletSelectors.selectProvider);

  const contract = useCallback(async () => {
    const { ERC20Mock__factory } = await import('./typechain/ERC20Mock__factory');
    return ERC20Mock__factory.connect(AppConfig.contracts.billing.token.billingTokenContract, provider);
  }, []);

  const getBalance = useCallback(
    async (account: string) => {
      const factory = await contract();
      return factory.balanceOf(account);
    },
    [contract],
  );

  const getFormedBalance = useCallback(
    async (account: string) => {
      const tk = await getBalance(account);
      const dec = await decimals();
      return formatUnits(tk, dec);
    },
    [contract],
  );

  const decimals = useCallback(async (): Promise<number> => {
    const factory = await contract();
    const dec = await factory.decimals();
    return Number(dec);
  }, [contract]);

  const allowance = useCallback(
    async (account: string) => {
      const factory = await contract();
      return await factory.allowance(account, AppConfig.contracts.billing.billingContract);
    },
    [contract],
  );

  return { decimals, allowance, getBalance, getFormedBalance };
};
