import { useState, useEffect, useContext, createContext, useMemo } from 'react';
// import {
//   signInWithPopup,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signOut as signOutFirebase
// } from 'firebase/auth';
// import {
//   doc,
//   getDoc,
//   setDoc,
//   onSnapshot,
//   serverTimestamp
// } from 'firebase/firestore';
// import { auth } from '@lib/firebase/app';
// import {
//   usersCollection,
//   userStatsCollection,
//   userBookmarksCollection
// } from '@lib/firebase/collections';
import type { ReactNode } from 'react';
import { getRandomId } from '@lib/random';
// import type { User as AuthUser } from 'firebase/auth';
// import type { WithFieldValue } from 'firebase/firestore';
import type { User } from '@lib/types/user';
import type { Bookmark } from '@lib/types/bookmark';
import { sleep } from '@lib/utils';
// import type { Stats } from '@lib/types/stats';
import { MetaMaskContext, MetamaskActions } from '@lib/context/metamask-context';
import {
  connectSnap,
  getSnap
} from '@lib/utils/snap';
import { getBip32E0Address, getBip32E0PublicKey } from '@lib/utils/snap';
import {nip19} from 'nostr-tools'

type AuthContext = {
  user: User | null;
  error: Error | null;
  loading: boolean;
  isAdmin: boolean;
  randomSeed: string;
  userBookmarks: Bookmark[] | null;
  signOut: () => Promise<void>;
  // signInWithGoogle: () => Promise<void>;
  openFlaskFoxWebSite: () => Promise<void>;
  connectWithSnap: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [userBookmarks, setUserBookmarks] = useState<Bookmark[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useContext(MetaMaskContext);

  useEffect(() => {

    setUser(null);
    setLoading(false);
    setUserBookmarks(null);

  }, []);

  useEffect(() => {

    if(state.isFlask && state.installedSnap !== undefined) {
      if(state.installedSnap.enabled) {

        sleep(500);

        (async () => {

          try {

            const addressResponse = await getBip32E0Address();
            if (addressResponse) {
              // setAddress(addressResponse);

              console.log(addressResponse);

            }
            // 9c2a6495b4e3de93f3e1cc254abe4078e17c64e5771abc676a5e205b62b1286c
            
            // 0x4fac8d7aea8f7f0dcd9804085a0a0f6c8ea5d3bb
            // 0x04356cc24ba6b86f2ffab7030ce8d4251d72fe7d4399c4ff0924887d617f7d75d62a978598ff76bbbe59f8e7e0daa8b55ce946f6dc98bf3b63730dba46aa85b0fe
            // npub1qs6kesjt56ux7tl6kupse6x5y5wh9lnagwvuflcfyjy86ctl046av25hskv07a4mhevl3elqm25t2h8fgmmdex9l8d3hxrd6g64gtv87fqt9x4

            const pubkeyResponse = await getBip32E0PublicKey();
            if (pubkeyResponse) {
              // setAddress(addressResponse);

              console.log(pubkeyResponse);
              
            }

            const npub = nip19.npubEncode(pubkeyResponse.slice(2)); // slice 0x

            const userData: User = {
              id: npub,
              bio: "BBB.",
              name: "Sato J." as string,
              theme: null,
              accent: null,
              website: null,
              location: null,
              photoURL: "https://robohash.org/"+npub as string,
              username: npub,
              verified: false,
              following: [],
              followers: [],
              // createdAt: serverTimestamp(),
              // updatedAt: null,
              totalTweets: 0,
              totalPhotos: 0,
              pinnedTweet: null,
              coverPhotoURL: null
            };
        
            setUser(userData);
            setLoading(false);
            setUserBookmarks([]);
        
            // setUser(null);
            // setLoading(false);
            // setUserBookmarks(null);
      
          } catch (error) {
            setError(error as Error);
          }

        })();



      }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);


  useEffect(() => {
    console.log(user?.id);
    
  }, [user?.id]);

  // const signInWithGoogle = async (): Promise<void> => {
  //   try {
  //     // const provider = new GoogleAuthProvider();
  //     // await signInWithPopup(auth, provider);
  //   } catch (error) {
  //     setError(error as Error);
  //   }
  // };
  
  const openFlaskFoxWebSite = async (): Promise<void> => {
    window.open("https://metamask.io/flask/", "_blank");
  }

  const connectWithSnap = async (): Promise<void> => {

    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }

  };

  const signOut = async (): Promise<void> => {
    try {
      // await signOutFirebase(auth);
    } catch (error) {
      setError(error as Error);
    }
  };

  const isAdmin = user ? user.username === 'ccrsxx' : false;
  const randomSeed = useMemo(getRandomId, [user?.id]);

  const value: AuthContext = {
    user,
    error,
    loading,
    isAdmin,
    randomSeed,
    userBookmarks,
    signOut,
    // signInWithGoogle,
    openFlaskFoxWebSite,
    connectWithSnap
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }

  return context;
}
