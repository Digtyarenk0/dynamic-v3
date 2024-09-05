import { track } from '@amplitude/analytics-browser';

import { AppRoutes } from 'app/router/route-config';

const home_visit = () => track('home_visit');

const check_button = () =>
  track('check_button', {
    page: AppRoutes.home,
  });

const protect_button = () =>
  track('protect_button', {
    page: AppRoutes.home,
  });

export default {
  home_visit,
  check_button,
  protect_button,
};
