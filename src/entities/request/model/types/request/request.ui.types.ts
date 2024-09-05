import { ReactElement } from 'react';

import { RequestBase } from './request.base';
import { BlockchainList, PlatformList } from './request.lists';

export interface Request extends RequestBase {
  platform?: PlatformList;
  blockchain?: BlockchainList;
}

export interface RequestSelector<Q> {
  selector?: ReactElement;
  value: Q;
}
