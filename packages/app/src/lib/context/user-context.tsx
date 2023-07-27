import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@lib/types/user';

type UserContext = {
  user: User | null;
  loading: boolean;
};

export const UserContext = createContext<UserContext | null>(null);

type UserContextProviderProps = {
  value: UserContext;
  children: ReactNode;
};

export function UserContextProvider({
  value,
  children
}: UserContextProviderProps): JSX.Element {


  // const { events } = useNostrEvents({
  //   filter: {
  //     authors: [
  //       // nip19.decode(router.query.npub?.toString() ?? "").data.toString() ?? "",
  //       testPubkey,
  //     ],
  //     since: 0,
  //     kinds: [0],
  //   },
  // });


  // useEffect(() => {
  //   if(user === undefined) {
  //     if(events.length > 0) {

  //       const pp = JSON.parse(events[0].content)

  //       const user: User = {
  //         // id: event[0].pubkey || "",
  //         id: testPubkey || "",
  //         bio: pp?.about || "",
  //         name: pp?.name || "",
  //         theme: null,
  //         accent: null,
  //         website: pp?.website || "",
  //         location: null,
  //         photoURL: ( pp?.picture || "https://robohash.org/"+(events[0].pubkey || "")) as string,
  //         username: pp?.username || events[0].pubkey || "",
  //         verified: false,
  //         following: [],
  //         followers: [],
  //         // createdAt: serverTimestamp(), --- kind 0 => created_At
  //         // updatedAt: null,
  //         totalTweets: 0,
  //         totalPhotos: 0,
  //         pinnedTweet: null,
  //         coverPhotoURL: ( pp?.banner || null) as string
  //       };


  //       console.log(user);
  //       // setUser(user);
  //       // setLoading(false);
  //     }
  //   }

  // }, [events]);
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContext {
  const context = useContext(UserContext);

  if (!context)
    throw new Error('useUser must be used within an UserContextProvider');

  return context;
}
