import { useNostr, dateToUnix } from "nostr-react";
import type { EditableUserData, User } from '@lib/types/user';

import {
    type Event as NostrEvent,
    getEventHash,
    getPublicKey,
    signEvent,
    Event,
  } from "nostr-tools";
import { convertEditableUserDataToNostrEvent, convertTweetDataToNostrEvent } from "./convert";
import { signNostrEvent } from "./snap";
import { Tweet } from "@lib/types/tweet";

export const TestPubkey = "82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2"

export type Kind0UserData = {
    npub: string;
    name?: string | undefined;
    username?: string | undefined;
    display_name?: string | undefined;
    picture?: string | undefined;
    banner?: string | undefined;
    about?: string | undefined;
    website?: string | undefined;
    lud06?: string | undefined;
    lud16?: string | undefined;
    nip05?: string | undefined;
  };

  
export async function updateUserData(
    user: User,
    publish: (event: NostrEvent) => void,
    userData: EditableUserData
  ): Promise<void> {

    let event = convertEditableUserDataToNostrEvent(user, userData);

    const signedEvent = await signNostrEvent(event);
    publish(signedEvent);

    // const userRef = doc(usersCollection, userId);
    // await updateDoc(userRef, {
    //   ...userData,
    //   updatedAt: serverTimestamp()
    // });

  }

  export async function publishTweetData(
    user: User,
    publish: (event: NostrEvent) => void,
    tweetData: Omit<Tweet, 'id'>
  ): Promise<void> {

    let event = convertTweetDataToNostrEvent(user, tweetData);
    
    console.log(event);
    const signedEvent = await signNostrEvent(event);
    publish(signedEvent);

    // content: "Helloworld from Nostamask!"
    // created_at: 1690982409
    // id: "c94dd7a8368719df618d3527456f673efd6043119e5e8d1da92b2508abe5d467"
    // kind: 1
    // pubkey: "deb6b335dd3c870e2d4aa8b4604002ca4d845f44bdcfb6c09ac2a4a2989e8403"
    // sig: "3a9728cec89229cc47b29083dc35318177d36c2fa71eb3a2efbc2fae724b1a81180aa3a03df9a76e510e3500bd553603a1ed8de2153466f5ed64d42b03496a50"
    // tags: []

  }