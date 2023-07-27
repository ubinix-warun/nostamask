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
// import { Input } from '@components/input/input';
// import { UpdateUsername } from '@components/home/update-username';
import { MainHeader } from '@components/home/main-header';
// import { Tweet } from '@components/tweet/tweet';
// import { Loading } from '@components/ui/loading';
// import { Error } from '@components/ui/error';
import { useNostrEvents } from "nostr-react";
import { nip19 } from "nostr-tools";

export default function Home(): JSX.Element {
  const { isMobile } = useWindow();

  // const { data, loading, LoadMore } = useInfiniteScroll(
  //   tweetsCollection,
  //   [where('parent', '==', null), orderBy('createdAt', 'desc')],
  //   { includeUser: true, allowNull: true, preserve: true }
  // );

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
      {/* {!isMobile && <Input />} */}
      {/* <section className='mt-0.5 xs:mt-0'>
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
            <LoadMore />
          </>
        )}
      </section> */}
      {/* <section className='mt-0.5 xs:mt-0'>
      <>
        <AnimatePresence mode='popLayout'>
        {events.map((event) => (
          <p key={event.id}>{event.created_at} posted: {event.content}</p>
        ))}
        </AnimatePresence>
        <LoadMore />
      </>
      </section> */}
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
