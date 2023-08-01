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
import { getNostrDefaultPublicKey , getSchnorrPublicKey} from '@lib/utils/snap';
import {generatePrivateKey, getPublicKey, nip19} from 'nostr-tools'
import { useNostrEvents } from 'nostr-react'
import { convertPubKeyOnlyToUser } from '@lib/utils/convert';
import { useUser } from './user-context';

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

        (async () => {

          try {

            const pubkeyResponse = await getSchnorrPublicKey();

            // TEST: npub!
            // npub18acd67v9xzffy5sxwyd20ev09y9fet2tx9juqsxq54653nzu05q0k5as
            // npub1q0m4t4f0exfru3auyx58vt5jx3znkmvp78qxctv0m2gu7e0q0q3hun0cq9w
            // npub1ersurphh8d68ndnsz9zru8ht68zpuhfx23nmwwkefrv57xle32xswf67m2

            const userData = await convertPubKeyOnlyToUser(pubkeyResponse);

            setUser(userData);
            setLoading(false);
            setUserBookmarks([]);
        
            // setUser(null);
            // setLoading(false);
            // setUserBookmarks(null);
      
          } catch (error) {
            console.log(error);
            setError(error as Error);
          }

        })();

      }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  
  // useEffect(() => {
  //   console.log("GOT UID=" + user?.id);
    
  // }, [user?.id]);

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

  // const isAdmin = user ? user.username === 'ccrsxx' : false;
  const isAdmin = false;
  // const isAdmin = true;

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
