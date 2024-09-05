import * as yup from 'yup';

import { isSolanaChain } from 'shared/lib/hooks/token-data/helper/parse';

import { BlockchainNamesList } from 'entities/request/model/types/request/request.lists';

export const YupHandleNFTCollectionValidation = yup.string().when('chain', {
  is: (value: BlockchainNamesList) => !isSolanaChain(value),
  then: yup
    .string()
    .matches(/^0x/, 'Colletion address should start with "0x"')
    .length(42, 'Colletion address length should be 42 characters')
    .required('Colletion address is required'),
  otherwise: yup.string(),
});

export const YupHandleNFTTokenValidation = yup
  .string()
  .required()
  .when('chain', {
    is: (value: BlockchainNamesList) => !isSolanaChain(value),
    then: yup.string().required('Token ID is required'),
    otherwise: yup
      .string()
      .test('length', 'Token ID length should be 44 characters', (value) => value?.length === 44)
      .required('Token ID is required'),
  });
