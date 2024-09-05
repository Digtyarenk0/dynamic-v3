import { Lists } from 'entities/request';

export interface ButtonCheckoutProps {
  item_id: string;
  method: Lists.MethodList;
}

export interface ButtonMintProps {
  item_id: string;
  platform: string;
  blockchain: string;
}

export interface ButtonMintSuccessProps extends ButtonMintProps {
  is_ipfs: boolean;
}

export interface ButtonViewProps extends ButtonMintProps {
  method: Lists.MethodList;
}
