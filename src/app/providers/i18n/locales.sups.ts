import { en, PluralCategory } from 'make-plural/plurals';

export const SupportedLocales = [
  // order as they appear in the language dropdown
  'en-US',
];
export type SupportedLocale = (typeof SupportedLocales)[number];

export const DEFAULT_LOCALE: SupportedLocale = 'en-US';

type LocalePlural = {
  [key in SupportedLocale]: (n: number | string, ord?: boolean) => PluralCategory;
};

export const plurals: LocalePlural = {
  'en-US': en,
};
