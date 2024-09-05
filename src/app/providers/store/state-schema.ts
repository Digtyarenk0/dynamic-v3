import { BillingStateSchema } from 'entities/billing/model/types/billing-types';
import { RequestsPageSchema } from 'entities/request';
import { UserSchemeState } from 'entities/user/model/types/user';
import { WalletSchema } from 'entities/wallet/model/types/types';

import { AuthorizationSchema } from 'features/authorization/model/types/authorization-types';
import { SocketSchema } from 'features/socket/model/types/socket.types';

import { LoaderSchema } from 'widgets/loader/model/types';

export interface StateSchema {
  user: UserSchemeState;
  authorization: AuthorizationSchema;
  //
  billing: BillingStateSchema;
  ethereum: WalletSchema;
  socket: SocketSchema;
  loader: LoaderSchema;
  //
  requests: RequestsPageSchema;
}

export type RootState = StateSchema;
