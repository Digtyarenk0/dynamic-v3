import { track } from '@amplitude/analytics-browser';

import { AppRoutes } from 'app/router/route-config';

import { ProtectSubmitProps } from './protect.types';

const protect_visit = () => track('protect_visit');

const protect_submit = ({ upload, type, items_ids, items_types, items_size }: ProtectSubmitProps) =>
  track('protect_submit', {
    page: AppRoutes.protect.root,
    upload,
    type,
    items_ids,
    items_types,
    items_size,
  });

export default {
  protect_visit,
  protect_submit,
};
