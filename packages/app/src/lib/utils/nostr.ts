import { useNostr, dateToUnix } from "nostr-react";
import type { EditableUserData, User } from '@lib/types/user';

import {
    type Event as NostrEvent,
    getEventHash,
    getPublicKey,
    signEvent,
    Event,
  } from "nostr-tools";
import { convertEditableUserDataToNostrEvent } from "./convert";
import { signNostrEvent } from "./snap";

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
    userData: EditableUserData
  ): Promise<void> {

    let event = convertEditableUserDataToNostrEvent(user, userData);

    const signedEvent = await signNostrEvent(event);
    console.log(signedEvent);

    // const { publish } = useNostr();

    // publish(event);

    // const userRef = doc(usersCollection, userId);
    // await updateDoc(userRef, {
    //   ...userData,
    //   updatedAt: serverTimestamp()
    // });

  }