import { init } from '@amplitude/analytics-browser';

import { AppConfig } from 'shared/config/envs';

import billing from './billing/billing';
import check from './check/check';
import home from './home/home';
import watermarks from './my-watermarks/my-watermarks';
import protect from './protect/protect';
import status from './status/status';
import transactions from './transactions/transactions';
import wallet from './wallet/wallet';

export const createConnect = (id: string) => init(id, undefined, { appVersion: AppConfig.app_version });

export const amplitudeEvents = {
  home,
  protect,
  check,
  watermarks,
  status,
  transactions,
  billing,
  wallet,
};
