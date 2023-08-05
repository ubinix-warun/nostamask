import type { ReactElement, ReactNode } from 'react';
import { useState, useEffect, useContext, createContext, useMemo } from 'react';

import { AnimatePresence } from 'framer-motion';
// import { where, orderBy } from 'firebase/firestore';
import { useWindow } from '@lib/context/window-context';
// import { useInfiniteScroll } from '@lib/hooks/useInfiniteScroll';
// import { tweetsCollection } from '@lib/firebase/collections';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { Input } from '@components/input/input';
import { UpdateUsername } from '@components/home/update-username';
import { MainHeader } from '@components/home/main-header';
import { Tweet } from '@components/tweet/tweet';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { useNostrEvents } from "nostr-react";
import { nip19 } from "nostr-tools";
import { useUser } from '@lib/context/user-context';
import { useAuth } from '@lib/context/auth-context';

export default function Home(): JSX.Element {
  const { isMobile } = useWindow();

  // const { data, loading, LoadMore } = useInfiniteScroll(
  //   tweetsCollection,
  //   [where('parent', '==', null), orderBy('createdAt', 'desc')],
  //   { includeUser: true, allowNull: true, preserve: true }
  // );

  const { user } = useAuth();
  
  const { events: data, isLoading: loading } = useNostrEvents({
    filter: {
      authors: [
        user?.id ?? "",
        "30808bfa8fe90e81ff35c94dce20e129345ccac1ea083c0662d288e31e1821ab",
        "640268b63356999349ba5556a0ce24e4a96d28da707f98f0590356000a3f20f1",
        "eab0e756d32b80bcd464f3d844b8040303075a13eabc3599a762c9ac7ab91f4f",
        "82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2",
      ],
      since: 0,
      limit: 20,
      // since: Math.round(Date.now() / 1000),
      // since: Math.round(Date.now() / 1000) + 60 * 60 * 24 * 360 /* 120 days */,
      kinds: [1],
    },
  });

  return (
    <MainContainer>
      <SEO title='Home / Twitter' />
      <MainHeader
        useMobileSidebar
        title='Home'
        className='flex items-center justify-between'
      >
        {/* <UpdateUsername /> */}
      </MainHeader>
      {!isMobile && <Input />}
      <section className='mt-0.5 xs:mt-0'>
        {loading ? (
          <Loading className='mt-5' />
        ) : !data ? (
          <Error message='Something went wrong' />
        ) : (
          <>
            <AnimatePresence mode='popLayout'>
              {data.map((tweet) => (
                <Tweet {...tweet} key={tweet.id} />
              ))}
            </AnimatePresence>
            {/* <LoadMore /> */}
          </>
        )}
      </section>
    </MainContainer>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
