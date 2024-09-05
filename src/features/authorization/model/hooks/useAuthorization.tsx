import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { t } from '@lingui/macro';
import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useModalContext } from 'app/providers/modal/modal-provider';
import { useWallet } from 'app/providers/wallet';

import { amplitudeEvents } from 'shared/lib/amplitude';

import { userReducerActions } from 'entities/user/model/slice/userSlice';
import { User } from 'entities/user/model/types/user';

import { PRIVACY_POLICY_COOKIE, TermsModal } from 'features/terms/ui/modal';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

import { postLogin } from '../api/auth-api';
import { authorizationReducerActions } from '../slice/authorization-slice';

export const useAuthorization = () => {
  const dispatch = useDispatch();

  const { primaryWallet, user } = useDynamicContext();
  const { wallet, connector } = useWallet();
  const { setModalData } = useModalContext();

  const [cookies] = useCookies([PRIVACY_POLICY_COOKIE]);

  const signIn = useCallback(async () => {
    if (!wallet) return;
    try {
      amplitudeEvents.wallet.signin_button();
      const { data } = await postLogin<User>(user?.userId as string);
      dispatch(userReducerActions.setUser(data));
      dispatch(authorizationReducerActions.clearErrors());
    } catch (error: any) {
      if (error?.code === 4001) {
        toast.error(t`User denied message signature.`);
        connector.deactivate();
      } else {
        toast.error(error.message || t`Authorisation Error`);
      }
      dispatch(authorizationReducerActions.setLoginErr(error?.message || t`Authorisation Error`));
    }
    dispatch(loaderReducerActions.end());
  }, [dispatch, connector, wallet, user]);

  const login = async () => {
    if (!cookies[PRIVACY_POLICY_COOKIE])
      return setModalData({
        title: t`Welcome To Watermarked`,
        className: '!w-[650px]',
        children: <TermsModal />,
      });
    if (primaryWallet?.isAuthenticated) {
      return signIn();
    }
    try {
      await connector.activate();
    } catch (e: any) {
      if (e.message === 'User rejected the request.') return console.log('ABO');
      console.error('login', e);
    }
  };

  return {
    signIn,
    login,
  };
};
