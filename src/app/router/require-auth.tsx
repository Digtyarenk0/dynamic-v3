import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from 'app/router/route-config';

import { selectUserIsLogged } from 'entities/user/model/selectors/userSelectors';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isLogged = useSelector(selectUserIsLogged);

  if (!isLogged) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={AppRoutes.home} replace />;
  }

  return children;
};
