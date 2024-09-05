import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { lazily } from 'react-lazily';
import { ToastContainer } from 'react-toastify';

import { ModalProvider } from 'app/providers/modal/modal-provider';
import { WalletContextProvider } from 'app/providers/wallet';

import { Web3ModalProvider } from 'shared/lib/blockchain/web3-modal/Web3ModalProvider';

import { DynamicProvider } from 'entities/dynamic/ui/dynamic-provider';

import { Loader } from 'widgets/loader/ui/loader';

interface MainLayoutProps {
  inited: boolean;
  children?: React.ReactNode;
}

const { Header } = lazily(() => import('widgets/header'));

export function MainLayout({ children, inited }: MainLayoutProps) {
  return (
    <Loader>
      <DynamicProvider>
        <Web3ModalProvider>
          <WalletContextProvider>
            <ModalProvider>
              <Header />
              <div className="mx-8 mt-20 mb-16 min-h-[100vh] flex justify-center">{inited && children}</div>
            </ModalProvider>
          </WalletContextProvider>
        </Web3ModalProvider>
      </DynamicProvider>
      <ToastContainer position="top-center" autoClose={8000} />
    </Loader>
  );
}
