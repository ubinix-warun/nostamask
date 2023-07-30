import { useNostr, dateToUnix } from "nostr-react";
import type { EditableUserData } from '@lib/types/user';

import {
    type Event as NostrEvent,
    getEventHash,
    getPublicKey,
    signEvent,
  } from "nostr-tools";
  
export async function updateUserData(
    userId: string,
    userData: EditableUserData
  ): Promise<void> {

    console.log(userId, userData);

    // const { publish } = useNostr();

    // JSON.stringify({});

    // const event: NostrEvent = {
    //     content: "",
    //     kind: 0,
    //     tags: [],
    //     created_at: dateToUnix(),
    //     pubkey: "",
    // };

    // event.id = getEventHash(event);
    // // event.sig = signEvent(event, privKey);

    // publish(event);

    // KIND 0 

// {
//     "banner": "https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
//     "picture": "https://nostr.build/i/p/nostr.build_6b9909bccf0f4fdaf7aacd9bc01e4ce70dab86f7d90395f2ce925e6ea06ed7cd.jpeg",
//     "reactions": false,
//     "lud16": "jackjack@getalby.com",
//     "damus_donation_v2": 100,
//     "name": "jack",
//     "website": "",
//     "display_name": "",
//     "about": "bitcoin & chill",
//     "npub": "npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m"
// }

    // const userRef = doc(usersCollection, userId);
    // await updateDoc(userRef, {
    //   ...userData,
    //   updatedAt: serverTimestamp()
    // });

  }