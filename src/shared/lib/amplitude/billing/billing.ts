import { track } from '@amplitude/analytics-browser';

import { AppRoutes } from 'app/router/route-config';

import { CalculateCostSuccessProps, DepositSuccessProps, WithdrawalSuccessProps } from './billing.types';

const deposit_success = ({ value }: DepositSuccessProps) =>
  track('deposit_success', {
    page: AppRoutes.billing,
    value,
  });

const calculate_cost_success = ({ items_types, items_size, extract, embed }: CalculateCostSuccessProps) =>
  track('calculate_cost_success', {
    items_types,
    items_size,
    extract,
    embed,
  });

const withdrawal_success = ({ value }: WithdrawalSuccessProps) =>
  track('withdrawal_success', {
    page: AppRoutes.billing,
    value,
  });

export default {
  deposit_success,
  calculate_cost_success,
  withdrawal_success,
};
