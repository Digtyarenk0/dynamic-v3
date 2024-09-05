import { track } from '@amplitude/analytics-browser';

import { WatermarksWmViewProps } from './my-watermarks.types';

const watermarks_visit = () => track('watermarks_visit');

const watermarks_wm_view = ({ blockchain, item_id }: WatermarksWmViewProps) =>
  track('watermarks_wm_view', {
    blockchain,
    item_id,
  });

export default {
  watermarks_visit,
  watermarks_wm_view,
};
