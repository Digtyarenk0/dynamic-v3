import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import React, { ReactNode, useEffect } from 'react';

import { DEFAULT_LOCALE, SupportedLocale, plurals } from './locales.sups';

export async function dynamicActivate(locale: SupportedLocale) {
  // @ts-ignore
  i18n.loadLocaleData(locale, { plurals: () => plurals[locale] });
  try {
    const catalog = await import(`locales/${locale}.js`);
    // Bundlers will either export it as default or as a named export named default.
    i18n.load(locale, catalog.messages || catalog.default.messages);
  } catch (error) {
    console.error(error);
  }
  i18n.activate(locale);
}

interface ProviderProps {
  children: ReactNode;
}

interface ProviderProps {
  locale: SupportedLocale;
  forceRenderAfterLocaleChange?: boolean;
  onActivate: (locale: SupportedLocale) => void;
  children: ReactNode;
}

if (i18n.locale === undefined || document.documentElement.getAttribute('lang') === DEFAULT_LOCALE) {
  // @ts-ignore
  i18n.loadLocaleData(DEFAULT_LOCALE, { plurals: () => plurals[DEFAULT_LOCALE] });
  i18n.load(DEFAULT_LOCALE, {});
  i18n.activate(DEFAULT_LOCALE);
}

export const AppI18NProvider = ({
  locale,
  forceRenderAfterLocaleChange = true,
  onActivate,
  children,
}: ProviderProps) => {
  useEffect(() => {
    dynamicActivate(locale)
      .then(() => onActivate(locale))
      .catch((error) => {
        console.error('Failed to activate locale', locale, error);
      });
  }, [locale, onActivate]);

  // Initialize the locale immediately if it is DEFAULT_LOCALE, so that keys are shown while the translation messages load.
  // This renders the translation _keys_, not the translation _messages_, which is only acceptable while loading the DEFAULT_LOCALE,
  // as [there are no "default" messages](https://github.com/lingui/js-lingui/issues/388#issuecomment-497779030).
  // See https://github.com/lingui/js-lingui/issues/1194#issuecomment-1068488619.

  return (
    <I18nProvider forceRenderOnLocaleChange={forceRenderAfterLocaleChange} i18n={i18n}>
      {children}
    </I18nProvider>
  );
};
