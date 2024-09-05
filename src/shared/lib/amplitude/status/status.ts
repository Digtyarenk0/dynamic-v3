import { track } from '@amplitude/analytics-browser';

import { Lists, ReqStatus } from 'entities/request';

import { ButtonMintSuccessProps, ButtonCheckoutProps, ButtonMintProps, ButtonViewProps } from './status.types';

const status_visit = () => track('status_visit');

export const getMethodFromList = (method: Lists.MethodList) =>
  method === Lists.MethodList.extract ? 'check' : 'protect';

const button_checkout = ({ item_id, method }: ButtonCheckoutProps) =>
  track('button_checkout', {
    item_id,
    method: getMethodFromList(method),
  });

const checkout_success = ({ item_id, method }: ButtonCheckoutProps) =>
  track('checkout_success', {
    item_id,
    method: getMethodFromList(method),
  });

const button_mint = ({ item_id, platform, blockchain }: ButtonMintProps) =>
  track('button_mint', {
    item_id,
    method: 'protect',
    platform,
    blockchain,
  });

const popup_button_mint = ({ item_id, platform, blockchain }: ButtonMintProps) =>
  track('popup_button_mint', {
    item_id,
    method: 'protect',
    platform,
    blockchain,
  });

const mint_success = ({ item_id, platform, blockchain, is_ipfs }: ButtonMintSuccessProps) =>
  track('mint_success', {
    item_id,
    method: 'protect',
    platform,
    blockchain,
    is_ipfs,
  });

const button_registration = ({ item_id, platform, blockchain }: ButtonMintProps) =>
  track('button_registration', {
    item_id,
    method: 'protect',
    platform,
    blockchain,
  });

const registration_success = ({ item_id, platform, blockchain }: ButtonMintProps) =>
  track('registration_success', {
    item_id,
    method: 'protect',
    platform,
    blockchain,
  });

const button_download = ({ item_id, platform, blockchain }: ButtonMintProps) =>
  track('button_download', {
    item_id,
    method: 'protect',
    platform,
    blockchain,
  });

const button_view = ({ item_id, method, platform, blockchain }: ButtonViewProps) =>
  track('button_view', {
    item_id,
    method: getMethodFromList(method),
    platform,
    blockchain,
  });

export default {
  status_visit,
  button_checkout,
  checkout_success,
  button_mint,
  popup_button_mint,
  mint_success,
  button_registration,
  registration_success,
  button_download,
  button_view,
};
