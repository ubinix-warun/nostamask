import '@styles/globals.scss';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { AuthContextProvider } from '@lib/context/auth-context';
import { ThemeContextProvider } from '@lib/context/theme-context';
import { AppHead } from '@components/common/app-head';
import { MetaMaskProvider } from '@lib/context/metamask-context';
import { NostrProvider } from "nostr-react";

// import { config as loadEnv } from "dotenv";
// import { SDK, Auth, TEMPLATES, Metadata } from "@infura/sdk";

// loadEnv(); // Move this to Server script!

// // Create Auth object
// const auth = new Auth({
//   projectId: process.env.INFURA_API_KEY,
//   secretId: process.env.INFURA_API_KEY_SECRET,
//   privateKey: process.env.WALLET_PRIVATE_KEY,
//   chainId: 1,
// });

const relayUrls = [
  "wss://nostr-pub.wellorder.net",
  // "wss://nostr.melhorque.com.br",
  "wss://no.str.cr",
  "wss://nostr.xpedite-tech.com"
];

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
        <NostrProvider relayUrls={relayUrls} debug={true}>
          {getLayout(<Component {...pageProps} />)}
        </NostrProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
      </MetaMaskProvider>
    </>
  );
}
