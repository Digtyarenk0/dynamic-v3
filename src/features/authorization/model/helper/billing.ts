import big from 'big.js';
import { formatUnits } from 'ethers';

export const toFixedNumber = (v: string, fix?: number) => {
  const value = Number(v);
  if (fix) return Number(value.toFixed(fix));
  if (value === 0) return 0;
  return Number(value.toFixed(2));
};

interface FormatUserBalanceUsage {
  amount: string;
  balance: string;
  decimal: number;
  paidAmount: string;
}

export const formatUserBalanceUsage = ({ balance, decimal, paidAmount, amount }: FormatUserBalanceUsage) => {
  const userAmount = formatUnits(amount, decimal);
  const userPaidAmount = formatUnits(paidAmount, decimal);

  const usaged = big(userAmount).sub(userPaidAmount).toString();
  return {
    usaged: toFixedNumber(usaged),
    balance: toFixedNumber(formatUnits(balance, decimal)),
  };
};
