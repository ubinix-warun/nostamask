// import { doc, query, where } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { useUser } from '@lib/context/user-context';
// import { useCollection } from '@lib/hooks/useCollection';
// import { useDocument } from '@lib/hooks/useDocument';
// import { tweetsCollection } from '@lib/firebase/collections';
// import { mergeData } from '@lib/merge';
import { UserLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { UserDataLayout } from '@components/layout/user-data-layout';
import { UserHomeLayout } from '@components/layout/user-home-layout';
// import { StatsEmpty } from '@components/tweet/stats-empty';
import { Loading } from '@components/ui/loading';
import { Tweet } from '@components/tweet/tweet';
import type { ReactElement, ReactNode } from 'react';
import { useNostrEvents } from 'nostr-react';

export default function UserTweets(): JSX.Element {

  const { user } = useUser();

//   const { id, username, pinnedTweet } = user ?? {};

//   const { data: pinnedData } = useDocument(
//     doc(tweetsCollection, pinnedTweet ?? 'null'),
//     {
//       disabled: !pinnedTweet,
//       allowNull: true,
//       includeUser: true
//     }
//   );

//   const { data: ownerTweets, loading: ownerLoading } = useCollection(
//     query(
//       tweetsCollection,
//       where('createdBy', '==', id),
//       where('parent', '==', null)
//     ),
//     { includeUser: true, allowNull: true }
//   );

//   const { data: peopleTweets, loading: peopleLoading } = useCollection(
//     query(
//       tweetsCollection,
//       where('createdBy', '!=', id),
//       where('userRetweets', 'array-contains', id)
//     ),
//     { includeUser: true, allowNull: true }
//   );

//   const mergedTweets = mergeData(true, ownerTweets, peopleTweets);

  const { events, isLoading } = useNostrEvents({
    filter: {
      authors: [
        user?.id ?? "",
      ],
      since: 0,
      limit: 20,
      // since: Math.round(Date.now() / 1000),
      // since: Math.round(Date.now() / 1000) + 60 * 60 * 24 * 360 /* 120 days */,
      kinds: [1],
    },
  });

  console.log(user)
  
  return (
    <section>
      {/* {ownerLoading || peopleLoading ? (
        <Loading className='mt-5' />
      ) : !mergedTweets ? (
        <StatsEmpty
          title={`@${username as string} hasn't tweeted`}
          description='When they do, their Tweets will show up here.'
        />
      ) : (
        <AnimatePresence mode='popLayout'>
          {pinnedData && (
            <Tweet pinned {...pinnedData} key={`pinned-${pinnedData.id}`} />
          )}
          {mergedTweets.map((tweet) => (
            <Tweet {...tweet} profile={user} key={tweet.id} />
          ))}
        </AnimatePresence>
      )} */}

    { isLoading ? (<Loading className='mt-5' />
      ) : (
      <AnimatePresence mode='popLayout'>
        {/* {pinnedData && (
          <Tweet pinned {...pinnedData} key={`pinned-${pinnedData.id}`} />
        )} */}
        { user &&
          // user?.username !== undefined &&
          // user?.username.length > 0 && 
          events.map((event) => (
            // <Tweet {...event} user={user} key={`${event.id}`} />
            <Tweet {...event} key={`${event.id}`} />
          ))}
      </AnimatePresence>
    )}
        

    </section>
  );
}

UserTweets.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <UserLayout>
        <UserDataLayout>
          <UserHomeLayout>{page}</UserHomeLayout>
        </UserDataLayout>
      </UserLayout>
    </MainLayout>
  </ProtectedLayout>
);
