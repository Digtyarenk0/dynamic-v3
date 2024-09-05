import { isAuthenticatedWithAWallet, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { t, Trans } from '@lingui/macro';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useWallet } from 'app/providers/wallet';

import { Button } from 'shared/ui';

import { selectUserIsLogged } from 'entities/user/model/selectors/userSelectors';

import { useAuthorization } from 'features/authorization/model/hooks/useAuthorization';
import { selectLoginErrMsg } from 'features/authorization/model/selectors/authorization-slectors';

export const isZeroDevAccount = (session?: any): boolean => {
  const zerodev = session?.find((i: any) => i?.wallet_name === 'zerodev');
  return !!zerodev;
};

export const Unauthorized = () => {
  const auth = useAuthorization();
  const { wallet, connector } = useWallet();
  const isLogged = useSelector(selectUserIsLogged);
  const isLoginError = useSelector(selectLoginErrMsg);

  const { primaryWallet, setShowDynamicUserProfile, user } = useDynamicContext();
  const [authing, setAuthing] = useState<boolean>(false);

  const openDynamic = () => setShowDynamicUserProfile(true);
  const { login } = useAuthorization();

  useEffect(() => {
    if (primaryWallet?.isAuthenticated && !isLogged && wallet?.account && !isLoginError && !authing) {
      setAuthing(true);
      auth.signIn();
    }
  }, [auth, authing, primaryWallet?.isAuthenticated, isLogged, isLoginError, wallet?.account]);

  useEffect(() => {
    const isZeroDevVerif = isZeroDevAccount(user?.verifiedCredentials);
    if (!isZeroDevVerif && user) {
      const authenticatedWithAWallet = isAuthenticatedWithAWallet(user);
      if (!authenticatedWithAWallet) {
        toast.warn(t`Your account only supports wallet login.`, { autoClose: 20_000 });
        connector.deactivate();
      }
    }
  }, [connector, user, user?.verifiedCredentials]);

  return (
    <div className="flex items-center">
      <div
        className={classNames('grid gap-8', primaryWallet?.isAuthenticated ? 'grid-cols-[90px_90px]' : 'grid-cols-1')}
      >
        {(!primaryWallet?.isAuthenticated || isLoginError) && (
          <Button theme="green" size="small" type="button" onClick={login}>
            <Trans>Sign In</Trans>
          </Button>
        )}
        {primaryWallet?.isAuthenticated && (
          <Button theme="green" size="small" type="button" onClick={openDynamic}>
            <Trans>Profile</Trans>
          </Button>
        )}
      </div>
    </div>
  );
};
