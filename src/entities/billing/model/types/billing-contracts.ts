export type GetUserBillingUsageData = {
  percent: number;
  usaged: number;
  balance: number;
};

export enum WithdrawalStatus {
  INACTIVE,
  REQUESTED,
  APPROVED,
}

export enum BillingStatus {
  TRUSTFUL,
  REQUESTED,
  TRUSTLESS,
}

export interface BillingUser {
  balance: string;
  paidAmount: string;
  withdrawalStatus: WithdrawalStatus;
  billingStatus: BillingStatus;
}
