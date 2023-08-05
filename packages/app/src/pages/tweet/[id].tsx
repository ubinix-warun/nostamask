import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
// import { doc, query, where, orderBy } from 'firebase/firestore';
// import { tweetsCollection } from '@lib/firebase/collections';
// import { useCollection } from '@lib/hooks/useCollection';
// import { useDocument } from '@lib/hooks/useDocument';
import { isPlural } from '@lib/utils';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { Tweet } from '@components/tweet/tweet';
import { ViewTweet } from '@components/view/view-tweet';
import { SEO } from '@components/common/seo';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { ViewParentTweet } from '@components/view/view-parent-tweet';
import type { ReactElement, ReactNode } from 'react';
import { TweetWithUser } from '@lib/types/tweet';
import { useAuth } from '@lib/context/auth-context';
import { useNostrEvents } from 'nostr-react';
import { Event } from 'nostr-tools';
import { convertUserDataToKind0UserData } from '@lib/utils/convert';
import { Kind0UserData } from '@lib/utils/nostr';

export default function TweetId(): JSX.Element {
  const router = useRouter();
  const { user } = useAuth();

  const [ tweetData, setTweetData ] = useState<TweetWithUser>();
  const [ tweetEvent, setTweetEvent ] = useState<Event>();

  const [ parentId, setParentId ] = useState<string>();
  const [ pageTitle, setPageTitle ] = useState<string>();

  const ids: string[] = [];
  ids.push (
    Array.isArray(router.query.id) ? 
      router.query.id[0] : 
      router.query.id ?? "" );
  
  const viewTweetRef = useRef<HTMLElement>(null);

  const { onEvent: onTweetEvent, 
          onSubscribe: onTweetSubscribe, 
          isLoading: tweetLoading, onDone } = useNostrEvents({
    filter: {
      ids: ids,
      kinds: [1],
    },
  })

  onTweetSubscribe(() => {

  })

  onTweetEvent((rawMetadata) => {

    setTweetEvent(rawMetadata);

  })

  useEffect(() => {

    if(tweetEvent) {


      fetch(`/api/metadata/${tweetEvent.pubkey}`)
        .then((response) => response.json())
        .then((data) => {
            const tweetUser = convertUserDataToKind0UserData(data as Kind0UserData);

            setTweetData({
              id: router.query.id?.toString() ?? "",
              text: tweetEvent.content,
              images: null,
              parent: null,
              userLikes: [],
              createdBy: tweetUser.username,
              createdAt: tweetEvent.created_at,
              user: tweetUser,
              userReplies: 0,
              userRetweets: []
            });
            
            const { text, images } = tweetData ?? {};

            const imagesLength = images?.length ?? 0;
            const parentId = tweetData?.parent?.id;

            const pageTitle = tweetData
              ? `${tweetData.user.name} on Twitter: "${text ?? ''}${
                  images ? ` (${imagesLength} image${isPlural(imagesLength)})` : ''
                }" / Twitter`
              : null;

            if(parentId!==null)
              setParentId(parentId);

            if(pageTitle!==null)
              setPageTitle(pageTitle);

          })
        .catch(console.error);

    }
  
  }, [tweetEvent]);

  // if(user) {

  // }


  // // const { data: repliesData, loading: repliesLoading } = useCollection(
  // //   query(
  // //     tweetsCollection,
  // //     where('parent.id', '==', id),
  // //     orderBy('createdAt', 'desc')
  // //   ),
  // //   { includeUser: true, allowNull: true }
  // // );



  return (
    <MainContainer className='!pb-[1280px]'>
      <MainHeader
        useActionButton
        title={parentId ? 'Thread' : 'Tweet'}
        action={router.back}
      />
      <section>
        {tweetLoading || (tweetEvent && !tweetData) ? (
          <Loading className='mt-5' />
        ) : !tweetData ? (
          <>
            <SEO title='Tweet not found / Twitter' />
            <Error message='Tweet not found' />
          </>
        ) : (
          <>
           {pageTitle && <SEO title={pageTitle} />}
             {parentId && (
              <ViewParentTweet
                parentId={parentId}
                viewTweetRef={viewTweetRef}
              />
            )}
            <ViewTweet viewTweetRef={viewTweetRef} {...tweetData} />
            {/*{tweetData &&
              (repliesLoading ? (
                <Loading className='mt-5' />
              ) : (
                <AnimatePresence mode='popLayout'>
                  {repliesData?.map((tweet) => (
                    <Tweet {...tweet} key={tweet.id} />
                  ))}
                </AnimatePresence>
              ))} */}
          </>
        )}
      </section>
    </MainContainer>
  );
}

TweetId.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
