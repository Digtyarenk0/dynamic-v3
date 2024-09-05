import 'app/styles/main.scss';
import 'app/styles/index.css';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { MainLayout } from 'app/layouts/main-layout';

import { selectUserInited } from 'entities/user/model/selectors/userSelectors';

import { userResumeSession } from 'features/session/model/service/resume-session/index.func';

import { LanguageProvider } from './providers/i18n/i18Provider';
import { Router } from './router/router';

export const App = () => {
  const userInited = useSelector(selectUserInited);

  useEffect(() => {
    userResumeSession();
  }, []);

  return (
    <LanguageProvider>
      <MainLayout inited={userInited}>
        <Router />
      </MainLayout>
    </LanguageProvider>
  );
};
