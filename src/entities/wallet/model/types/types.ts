import { JsonRpcProvider, JsonRpcSigner, Provider, WebSocketProvider } from 'ethers';

// Dynamic wallet
export interface EVMWallet {
  account: string;
  chainId: number;
  provider: Provider;
  signer: JsonRpcSigner;
}

export interface WalletSchema {
  provider: JsonRpcProvider;
  webSocketProvider: WebSocketProvider;
  wallet?: EVMWallet;
}
