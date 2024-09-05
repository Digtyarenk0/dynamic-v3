import { t } from '@lingui/macro';
import { AxiosResponse } from 'axios';
import { JsonRpcSigner } from 'ethers';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { amplitudeEvents } from 'shared/lib/amplitude';

import { UserRequest } from 'entities/request';
import { requestsPageReducerActions } from 'entities/request/model/slice/request-page-slice';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

import { billingRequests } from '../api/billing-api';
import { fetchUserBillingAmountAction } from '../service/fetch-billing-amount/fetch-billing-amount';
import { billingReducerActions } from '../slice/billing-slice';

export const useBillingChecks = () => {
  const dispatch = useDispatch();

  const sign = useCallback(
    async (id: number, signer: JsonRpcSigner) => {
      try {
        dispatch(loaderReducerActions.set(t`Get Check`));
        const { data } = await billingRequests.getCheckForSign(id);
        dispatch(loaderReducerActions.set(t`Waiting for signing`));
        const signed: string = await signer.signMessage(data.dataForSignature);
        dispatch(loaderReducerActions.set(t`Payment verification`));
        const { data: query }: AxiosResponse<UserRequest> = await billingRequests.postSignedCheck(id, signed);
        amplitudeEvents.status.checkout_success({ item_id: id.toString(), method: query.method });
        dispatch(requestsPageReducerActions.updateRequest({ id, changes: query }));
        dispatch(fetchUserBillingAmountAction.call());
      } catch (error: any) {
        console.error('signCheck', error);
        if (error?.code === 'ACTION_REJECTED') {
          toast.error(t`User denied message signature.`);
        } else if (error?.status === 402) {
          dispatch(billingReducerActions.setNotEnoughBalance(true));
          toast.error(error?.message);
        } else if (error?.message) {
          toast.error(error?.message);
        }
      }
      dispatch(loaderReducerActions.end());
    },
    [dispatch],
  );

  return {
    sign,
  };
};
