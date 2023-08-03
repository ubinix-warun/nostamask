
import type { EditableUserData, User } from '@lib/types/user';
import { dateToUnix } from "nostr-react";
import {
    UnsignedEvent, nip19
  } from "nostr-tools";
import { Kind0UserData, TestPubkey } from '@lib/utils/nostr';
import { Tweet } from '@lib/types/tweet';


export async function convertPubKeyOnlyToUser(
    pubkeyResponse: string,
    ): Promise<User> {
    
    let npub = ""
    if(pubkeyResponse.startsWith("0x")) {
        npub = nip19.npubEncode(pubkeyResponse.slice(2)); // slice 0x
    } else {
        npub = nip19.npubEncode(pubkeyResponse);
    }

    const userData: User = {
        id: pubkeyResponse,
        bio: "",
        name: "" as string,
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

    return userData;

}

export function convertUserDataToKind0UserData(
    userData: Kind0UserData,
    ): User {
    
   return {
      id: nip19.decode(userData?.npub ?? "").data.toString() || "",
    //   id: TestPubkey || "",
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
};

export function convertEditableUserDataToNostrEvent(
    user: User,
    userData: EditableUserData
  ): any {

    const rawMsg = JSON.stringify(
      {
        "banner": userData.coverPhotoURL,
        "picture": userData.photoURL,
        // "reactions": false,
        // "lud16": "jackjack@getalby.com",
        // "damus_donation_v2": 100,
        "name": userData.name,
        "website": userData.website,
        // "lud06": "LNURL1DP68GURN8GHJ7AMPD3KX2AR0VEEKZAR0WD5XJTNRDAKJ7TNHV4KXCTTTDEHHWM30D3H82UNVWQHHW6TWDE5KUEMZD3HHWEM4DCURVNYWCP4",
        // "damus_donation": 100,
        // "display_name": "",
        "about": userData.bio,
        "location": userData.location,
        "npub": user.id
      }
    );

    const event: any = {
        content: rawMsg,
        kind: 0,
        tags: [],
        created_at: dateToUnix(),
    };

    return event;
  }


  export function convertTweetDataToNostrEvent(
    user: User,
    tweetData: Omit<Tweet, 'id'>
  ): any {

    const rawMsg = tweetData.text

    const event: any = {
        content: rawMsg,
        kind: 1,
        tags: [],
        created_at: tweetData.createdAt,
    };

    return event;
  }