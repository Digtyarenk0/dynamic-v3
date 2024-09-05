import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { t } from '@lingui/macro';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { useWallet } from 'app/providers/wallet';
import { AppRoutes } from 'app/router/route-config';

import LogotypeFullSvg from 'shared/assets/icons/logotype-full.svg';
import { createConnect } from 'shared/lib/amplitude';
import { Navigation } from 'shared/ui';

import 'features/session/model/api/session-interseptor'; // inject interceptor session in Axios

import DynamicUserProfileForward from 'entities/dynamic/ui/user-profile/user-profile';
import { userMiddlewareResetDataAction } from 'entities/user/model/middleware/userCustomMiddleware/actions-user-middlewate';
import { selectUserIsLogged } from 'entities/user/model/selectors/userSelectors';
import { ApiSocket } from 'entities/user/model/socket/socket';

import { socketReducerActions } from 'features/socket';
import { selectSocketConnect } from 'features/socket/model/selectors/selector';

import { Authorized } from '../authorized';
import { Unauthorized } from '../unauthorized';

import styles from './header.module.scss';

const navigationData = [
  {
    title: t`Protect`,
    links: [AppRoutes.protect.root, AppRoutes.protect.watermark.single, AppRoutes.protect.watermark.series],
    link: AppRoutes.protect.watermark.single,
  },
  {
    title: t`Check`,
    links: [AppRoutes.check.file, AppRoutes.check.nft],
    link: AppRoutes.check.file,
  },
  {
    title: t`Pricing`,
    link: AppRoutes.pricing,
  },
];

const navigationDataAuthed = [
  ...navigationData,
  {
    title: t`Billing`,
    link: AppRoutes.billing,
  },
];

export const Header = () => {
  const dispatch = useDispatch();

  const dynamic = useWallet();
  const { authToken } = useDynamicContext();

  const userIsLogged = useSelector(selectUserIsLogged);
  const socketConnection = useSelector(selectSocketConnect);

  useEffect(() => {
    if (userIsLogged && !dynamic.isAuthenticated) {
      dispatch(userMiddlewareResetDataAction());
    }
  }, [dispatch, dynamic.isAuthenticated, userIsLogged]);

  useEffect(() => {
    if (!socketConnection && userIsLogged && authToken) {
      const socket = ApiSocket.InitiateSocket(authToken);
      dispatch(socketReducerActions.setSocket(socket));
    }
  }, [socketConnection, authToken, userIsLogged]);

  return (
    <header className={styles.header}>
      <div className={styles.left_side}>
        <NavLink to={AppRoutes.home} className={styles.logotype}>
          <LogotypeFullSvg className={styles.logotype_img} />
        </NavLink>
        <Navigation className="ml-[70px]" data={userIsLogged ? navigationDataAuthed : navigationData} />
      </div>
      <DynamicUserProfileForward />
      {userIsLogged ? <Authorized /> : <Unauthorized />}
    </header>
  );
};
