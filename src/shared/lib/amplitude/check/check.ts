import { track } from '@amplitude/analytics-browser';

import { AppRoutes } from 'app/router/route-config';

import { CheckSubmitProps } from './check.types';

const check_visit = () => track('check_visit');

const check_submit = ({ upload, type, items_ids, items_types, items_size }: CheckSubmitProps) =>
  track('check_submit', {
    page: AppRoutes.check.file,
    upload,
    type,
    items_ids,
    items_types,
    items_size,
  });

export default {
  check_visit,
  check_submit,
};
