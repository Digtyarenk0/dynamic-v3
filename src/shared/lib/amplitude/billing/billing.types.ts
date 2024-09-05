export interface DepositSuccessProps {
  value: number;
}

export type WithdrawalSuccessProps = DepositSuccessProps;

export interface CalculateCostSuccessProps {
  items_types: string[];
  items_size: number;
  extract: string;
  embed: string;
}
