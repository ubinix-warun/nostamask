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
// import type { Stats } from '@lib/types/stats';

type AuthContext = {
  user: User | null;
  error: Error | null;
  loading: boolean;
  isAdmin: boolean;
  randomSeed: string;
  userBookmarks: Bookmark[] | null;
  signOut: () => Promise<void>;
  // signInWithGoogle: () => Promise<void>;
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

  useEffect(() => {

    setUser(null);
    setLoading(false);
    setUserBookmarks(null);

  }, []);

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

  const connectWithSnap = async (): Promise<void> => {
    try {

      const userData: User = {
        id: "123456",
        bio: "BBB.",
        name: "Sato J." as string,
        theme: null,
        accent: null,
        website: null,
        location: null,
        photoURL: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12700727-e571-4400-b2de-4710cd56e9ce/d2csxgk-016acaea-d716-48af-a75f-3cea03f7261f.png/v1/fill/w_150,h_150,q_80,strp/rurouni_kenshin_avatar_9_by_darkfirextreme_d2csxgk-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTUwIiwicGF0aCI6IlwvZlwvMTI3MDA3MjctZTU3MS00NDAwLWIyZGUtNDcxMGNkNTZlOWNlXC9kMmNzeGdrLTAxNmFjYWVhLWQ3MTYtNDhhZi1hNzVmLTNjZWEwM2Y3MjYxZi5wbmciLCJ3aWR0aCI6Ijw9MTUwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0._ALpTgXbXQo8edBTFp_DqA_wMHdnmD9hRWuw9cdJDZk" as string,
        username: "sato-j",
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
