import { useDynamicContext, useWalletConnectorEvent, Wallet } from '@dynamic-labs/sdk-react-core';
import { t } from '@lingui/macro';
import { JsonRpcProvider, JsonRpcSigner } from 'ethers';
import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

import { instance } from 'shared/api';

import { PRIVACY_POLICY_COOKIE, TermsModal } from 'features/terms/ui/modal';

import { useModalContext } from '../modal/modal-provider';

import { dynamicEthersV6 } from './helper';

interface WalletState {
  activeChain: number | null;
  isAuthenticated: boolean;
  switchChain: (networkChainId: number) => Promise<void>;
  connector: {
    connectEagerly: () => void;
    activate: (...args: unknown[]) => Promise<void>;
    deactivate: () => Promise<void>;
  };
  wallet:
    | {
        account: string;
        chainId: number;
        provider: JsonRpcProvider;
        signer: JsonRpcSigner;
      }
    | undefined;
}

const WalletContext = React.createContext(undefined as unknown as WalletState);

export const WalletContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { primaryWallet, authToken, setShowAuthFlow, handleLogOut, network, ...args } = useDynamicContext();

  const { setModalData } = useModalContext();
  const [cookies] = useCookies([PRIVACY_POLICY_COOKIE]);

  const [activeChain, setActiveChain] = useState<number | null>(null);
  const [connect, setProvider] = useState<{ provider: JsonRpcProvider; signer: JsonRpcSigner }>();

  const chainId: number | undefined = useMemo(
    () =>
      connect?.provider.provider._network.chainId ? Number(connect?.provider.provider._network.chainId) : undefined,
    [connect?.provider.provider._network.chainId],
  );
  const account: string | undefined = useMemo(
    () => (chainId ? connect?.signer.address : undefined),
    [chainId, connect?.signer.address],
  );

  const switchChain = useCallback(
    async (networkChainId: number) => {
      if (primaryWallet?.connector?.supportsNetworkSwitching()) {
        await primaryWallet?.connector.switchNetwork({ networkChainId });
      }
    },
    [primaryWallet?.connector],
  );

  const deactivate = useCallback(async () => {
    setProvider(undefined);
    await handleLogOut();
  }, [handleLogOut]);

  const setDynamicWeb3 = useCallback(
    async (primaryWallet: Wallet) => {
      if (!cookies[PRIVACY_POLICY_COOKIE])
        return setModalData({
          title: t`Welcome To Watermarked`,
          children: <TermsModal />,
        });
      //
      // TODO: activate
      // const { getSigner } = await import('@dynamic-labs/ethers-v6');
      // const provider = await getSigner(primaryWallet);
      const v6 = await dynamicEthersV6(primaryWallet);
      const provider = await v6.getSigner(primaryWallet.address);
      //
      if (provider) {
        const signer = await provider.provider.getSigner();
        return setProvider({
          provider: provider as unknown as JsonRpcProvider,
          signer,
        });
      }
      return console.error('DYNAMIC PROVIDER NOT FOUND');
    },
    [cookies, setModalData],
  );

  useEffect(() => {
    primaryWallet?.connector
      ?.getNetwork()
      .then((c) => setActiveChain(c as number))
      .catch(console.error);
  }, [primaryWallet?.connector, chainId]);

  useEffect(() => {
    if (primaryWallet?.isAuthenticated) {
      (async () => {
        const isConnected = await primaryWallet?.isConnected();
        if (isConnected) setDynamicWeb3(primaryWallet);
      })();
    }
  }, [primaryWallet, setDynamicWeb3]);

  useEffect(() => {
    if (!primaryWallet?.isAuthenticated && account) deactivate();
  }, [deactivate, primaryWallet?.isAuthenticated, account]);

  const connector = useMemo(() => {
    const activate = async (...args: unknown[]): Promise<void> => {
      if (!cookies[PRIVACY_POLICY_COOKIE])
        return setModalData({
          title: t`Welcome To Watermarked`,
          children: <TermsModal />,
        });
      if (args.length === 0) return setShowAuthFlow(true);
      if (Number.isInteger(args?.[0])) return switchChain(args[0] as number);
      if (typeof args?.[0] === 'object') {
        console.error({ message: 'Adding a network is not supported in Dynamic', chain: args?.[0] });
      }
    };
    const connectEagerly = (): void => {
      if (!cookies[PRIVACY_POLICY_COOKIE])
        return setModalData({
          title: t`Welcome To Watermarked`,
          children: <TermsModal />,
        });
      if (primaryWallet?.isAuthenticated) setShowAuthFlow(true);
    };

    return {
      connectEagerly,
      activate,
      deactivate,
    };
  }, [deactivate, cookies, setModalData, setShowAuthFlow, switchChain, primaryWallet?.isAuthenticated]);

  // Events
  useWalletConnectorEvent(primaryWallet?.connector, 'chainChange', () => {
    if (connect && primaryWallet) {
      setDynamicWeb3(primaryWallet);
    }
  });

  useWalletConnectorEvent(primaryWallet?.connector, 'accountChange', () => {
    if (connect && primaryWallet) {
      setDynamicWeb3(primaryWallet);
    }
  });

  useWalletConnectorEvent(primaryWallet?.connector, 'disconnect', () => deactivate());

  const wallet = useMemo(() => {
    if (!connect || !chainId || !account) return;
    return {
      account,
      chainId,
      provider: connect.provider,
      signer: connect.signer,
    };
  }, [account, chainId, connect?.provider, connect?.signer]);

  useEffect(() => {
    if (authToken) instance.defaults.headers.common['authorizationdynamic'] = `Bearer ${authToken}`;
  }, [authToken]);

  const value: WalletState = useMemo(
    () => ({
      activeChain,
      wallet,
      connector,
      isAuthenticated: !!primaryWallet?.isAuthenticated,
      switchChain,
    }),
    [connector, activeChain, primaryWallet?.isAuthenticated, switchChain, wallet],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletContext');
  }

  return context;
};
