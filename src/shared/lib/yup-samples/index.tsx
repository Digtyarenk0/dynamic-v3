import { t } from '@lingui/macro';
import * as yup from 'yup';

const file = yup.mixed();

const itemName = yup
  .string()
  .min(3, t`Item name should be more than 3 characters.`)
  .max(32, t`Item name should not be more than 32 characters.`);

const itemSymbol = yup.string().max(8, t`Item symbol should not be more than 8 characters.`);

const itemDescription = yup
  .string()
  .nullable()
  .transform((curr, orig) => (orig === '' ? null : curr))
  .min(3, t`Item description should be more than 3 characters.`)
  .max(240, t`Item name should not be more than 240 characters.`);

const collectionIdEvm = yup.string().length(42, t`The length of the collection address must be 42 characters.`);

const collectionIdSol = yup.string().length(44, t`The length of the collection address must be 44 characters.`);

const supply = yup
  .number()
  .integer()
  .positive(t`Only positive number`)
  .round('round')
  .min(1, t`Minimum 1 supply.`);

const royalty = yup
  .number()
  .integer()
  .positive(t`Only positive number`)
  .min(0)
  .max(100, t`Maximum 100% royalty.`);

export const YupSamples = {
  file,
  itemName,
  itemSymbol,
  itemDescription,
  collectionIdEvm,
  collectionIdSol,
  supply,
  royalty,
};
