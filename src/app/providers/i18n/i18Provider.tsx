import React, { ReactNode, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AppI18NProvider } from './i18n';
import { SupportedLocale, DEFAULT_LOCALE } from './locales.sups';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  // @ts-ignore
  // const storeUserLocale = useSelector((state: RootState) => state?.app?.userLocale) || DEFAULT_LOCALE;
  const storeUserLocale = DEFAULT_LOCALE;

  const onActivate = useCallback(
    (locale: SupportedLocale) => {
      document.documentElement.setAttribute('lang', locale);
      // dispatch(setUserLocale(locale));
    },
    [dispatch],
  );

  return (
    <AppI18NProvider locale={storeUserLocale} forceRenderAfterLocaleChange={false} onActivate={onActivate}>
      {children}
    </AppI18NProvider>
  );
}
