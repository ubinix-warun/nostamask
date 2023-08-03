import {
    validateEvent,
    verifySignature,
    getSignature,
    getEventHash,
    type Event as NostrEvent,
} from 'nostr-tools'
import {generatePrivateKey, getPublicKey} from 'nostr-tools'

import { getAccountFromWallet } from './private-key';
import { NostrEventParams } from './rpc-types';

export const getDefaultPublicKey = async (): Promise<string> => {
    const account = await getAccountFromWallet(snap); // (snap, undefined, 0)
    // m/44'/0'/0'/0/0 = !!!

    if(account.privateKey === undefined)
    {
        throw new Error('privateKey undefined');
    }


// "can't serialize event with wrong or missing properties"

    // const event: UnsignedEvent = {
    //     kind: 1,
    //     created_at: Math.floor(Date.now() / 1000),
    //     tags: [],
    //     content: 'hello',
    //     pubkey: account.compressedPublicKey.slice(2)
    //   }

    //  let signedEvent = event as Event;

    //  signedEvent.id = getEventHash(event);
    //  signedEvent.sig = getSignature(event, account.privateKey);
      
    //   let ok = validateEvent(event);
    //   let veryOk = verifySignature(signedEvent);

    // // return getPublicKey(account.privateKey);

    return account.compressedPublicKey;

};

export type storageTmp = {
    sk: string
}

export const getSchnorrPublicKey = async (): Promise<string> => {

    let persistedData = (await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
    })) as storageTmp;

    if(persistedData === null) {
        let sk = generatePrivateKey() // `sk` is a hex string
        await snap.request({
            method: 'snap_manageState',
            params: { operation: 'update', newState: { sk: sk } },
        });
        // Recheck
        persistedData = (await snap.request({
            method: 'snap_manageState',
            params: { operation: 'get' },
        })) as storageTmp;
    } 

    if(persistedData === null || persistedData?.sk === undefined) {

        throw new Error('persistedData null or .sk undefined');
    }

    let pk = getPublicKey(persistedData?.sk?.toString() ?? "") // `pk` is a hex string

    // IT's WORK
    // const event: UnsignedEvent = {
    //     kind: 1,
    //     created_at: Math.floor(Date.now() / 1000),
    //     tags: [],
    //     content: 'hello',
    //     pubkey: pk
    //   }

    //  let signedEvent = event as Event;

    //  signedEvent.id = getEventHash(event);
    //  signedEvent.sig = getSignature(event, sk);
      
    //   let ok = validateEvent(event);
    //   let veryOk = verifySignature(signedEvent);

    return pk;
}

export const signNostrEvent = async ({ e }: NostrEventParams): Promise<NostrEvent> => {

    let persistedData = (await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
    })) as storageTmp;

    if(persistedData === null || persistedData?.sk === undefined) {

        throw new Error('persistedData null or .sk undefined');
    }

    try {

        let signedEvent: any = {
            kind: e.kind,
            created_at: e.created_at,
            tags: e.tags,
            content: e.content,
            pubkey: getPublicKey(persistedData?.sk)
        }

        signedEvent.id = getEventHash(signedEvent);
        signedEvent.sig = getSignature(signedEvent, persistedData?.sk);

        return signedEvent;
        
    } catch(err) {
        const result = (err as Error).message;
        throw new Error(result);
    }


}