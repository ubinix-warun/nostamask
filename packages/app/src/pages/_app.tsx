import '@styles/globals.scss';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { AuthContextProvider } from '@lib/context/auth-context';
import { ThemeContextProvider } from '@lib/context/theme-context';
import { AppHead } from '@components/common/app-head';
import { MetaMaskProvider } from '@lib/context/metamask-context';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps
}: AppPropsWithLayout): ReactNode {
  const getLayout = Component.getLayout ?? ((page): ReactNode => page);

  return (
    <>
      <AppHead />
      <MetaMaskProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          {getLayout(<Component {...pageProps} />)}
        </ThemeContextProvider>
      </AuthContextProvider>
      </MetaMaskProvider>
    </>
  );
}
