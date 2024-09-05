import { track } from '@amplitude/analytics-browser';

const transactions_visit = () => track('transactions_visit');

export default {
  transactions_visit,
};
