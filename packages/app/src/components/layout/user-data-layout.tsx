import { useRouter } from 'next/router';
import { UserContextProvider } from '@lib/context/user-context';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { UserHeader } from '@components/user/user-header';
import type { LayoutProps } from '@components/layout/common-layout';
import { useProfile } from "nostr-react";
import { data } from 'autoprefixer';
import { nip19 } from 'nostr-tools'
import { User } from '@lib/types/user';

export function UserDataLayout({ children }: LayoutProps): JSX.Element {

  const router = useRouter();

  // const { data, loading } = useCollection(
  //   query(usersCollection, where('username', '==', id), limit(1)),
  //   { allowNull: true }
  // );

  // SAMPLE nProfile https://nostrcheck.me/converter/

  // pubkey: "9c2a6495b4e3de93f3e1cc254abe4078e17c64e5771abc676a5e205b62b1286c",
  // pubkey: "82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2",

// npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m
// 82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2
// {
//     "banner": "https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
//     "picture": "https://nostr.build/i/p/nostr.build_6b9909bccf0f4fdaf7aacd9bc01e4ce70dab86f7d90395f2ce925e6ea06ed7cd.jpeg",
//     "reactions": false,
//     "lud16": "jackjack@getalby.com",
//     "damus_donation_v2": 100,
//     "name": "jack",
//     "website": "",
//     "lud06": "LNURL1DP68GURN8GHJ7AMPD3KX2AR0VEEKZAR0WD5XJTNRDAKJ7TNHV4KXCTTTDEHHWM30D3H82UNVWQHHW6TWDE5KUEMZD3HHWEM4DCURVNYWCP4",
//     "damus_donation": 100,
//     "display_name": "",
//     "about": "bitcoin & chill",
//     "npub": "npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m"
// }

// 9c2a6495b4e3de93f3e1cc254abe4078e17c64e5771abc676a5e205b62b1286c
// {
//     "name": "tristan",
//     "npub": "npub1ns4xf9d5u00f8ulpesj540jq0rshce89wudtcem2tcs9kc439pkqpasrca"
// }

  const { data: userData } = useProfile({
    pubkey: nip19.decode(router.query.npub?.toString() ?? "").data.toString(),
  });
  
  // const user = data ? data[0] : null;
  console.log(userData);

  const user: User = {
    id: userData?.npub || "",
    bio: userData?.about || "",
    name: userData?.name || "",
    theme: null,
    accent: null,
    website: userData?.website || "",
    location: null,
    photoURL: ( userData?.picture || "https://robohash.org/"+(userData?.npub || "")) as string,
    username: userData?.username || userData?.npub || "",
    verified: false,
    following: [],
    followers: [],
    // createdAt: serverTimestamp(),
    // updatedAt: null,
    totalTweets: 0,
    totalPhotos: 0,
    pinnedTweet: null,
    coverPhotoURL: ( userData?.banner || null) as string
  };
  const  loading = false;

  return (
    <UserContextProvider value={{ user, loading }}>
      {!user && !loading && <SEO title='User not found / Twitter' />}
      <MainContainer>
        <MainHeader useActionButton action={router.back}>
          <UserHeader />
        </MainHeader>
        {children}
      </MainContainer>
    </UserContextProvider>
  );
}
