import big from 'big.js';
import { formatEther } from 'ethers';

export const toFixedNumber = (v: string) => {
  const value = Number(v);
  if (value > 100) {
    return Number(value.toFixed());
  } else if (value > 10) {
    return Number(value.toFixed(1));
  } else {
    return Number(value.toFixed(2));
  }
};

interface FormatUserBalanceUsage {
  amount: string;
  balance: string;
  paidAmount: string;
}

export const formatUserBalanceUsage = ({ balance, paidAmount, amount }: FormatUserBalanceUsage) => {
  const userAmount = formatEther(amount);
  const userPaidAmount = formatEther(paidAmount);

  const usaged = big(userAmount).sub(userPaidAmount).toString();
  return {
    usaged: toFixedNumber(usaged),
    balance: toFixedNumber(formatEther(balance)),
  };
};
