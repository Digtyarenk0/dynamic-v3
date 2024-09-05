import { BillingStatus, WithdrawalStatus } from './billing-contracts';

export interface UserBalanceUsaged {
  usaged: number;
  contractBalance: number;
}

export interface BillingStateSchema {
  notEnoughBalance: boolean;
  userBillingBalance?: number;
  amount?: string;
  decimal?: number;
  billingStatus?: BillingStatus;
  withdrawalStatus?: WithdrawalStatus;
}

export interface PayCheckWorkerProps {
  id: number;
}
