import { t } from '@lingui/macro';

import { Lists } from 'entities/request';

export const getFrontNameMethod = (method: Lists.MethodList, countNfts?: number) => {
  switch (method) {
    case Lists.MethodList.embedBatch: {
      if (countNfts) {
        const end = countNfts > 1 ? t`${countNfts} items` : countNfts;
        return t`protect multiple ${end}`;
      }
      return t`protect multiple`;
    }
    case Lists.MethodList.embed:
      return t`protect`;
    case Lists.MethodList.extract:
      return t`check`;
    default:
      return method;
  }
};
