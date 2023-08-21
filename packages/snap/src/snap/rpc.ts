import {
    getSignature,
    getEventHash,
    type Event as NostrEvent,
} from 'nostr-tools'
import {getPublicKey} from 'nostr-tools'

import { getAccountFromWallet } from './private-key';
import { NostrEventParams } from './rpc-types';
import { getSecureState, SecureState } from './store-state';

export const getDefaultPublicKey = async (): Promise<string> => {
    const account = await getAccountFromWallet(snap); // (snap, undefined, 0)
    // m/44'/0'/0'/0/0 = !!!

    if(account.privateKey === undefined)
    {
        throw new Error('privateKey undefined');
    }

    return account.compressedPublicKey;

};


export const isExistsSchnorrPublicKey = async (): Promise<boolean> => {

    let persistedData = await getSecureState();

    return (persistedData !== null && persistedData?.sk !== undefined)
}

export const getSchnorrPublicKey = async (): Promise<string> => {

    // if(persistedData === null) {
    //     let sk = generatePrivateKey() // `sk` is a hex string
    //     await snap.request({
    //         method: 'snap_manageState',
    //         params: { operation: 'update', newState: { sk: sk } },
    //     });

    //     // reload 
    //     persistedData = await getSecureState();
    // } 

    if(!(await isExistsSchnorrPublicKey())) {

        throw new Error('persistedData null or .sk undefined');
    }

    let persistedData = await getSecureState();
    let pk = getPublicKey(persistedData?.sk?.toString() ?? "") // `pk` is a hex string

    return pk;
}

export const signNostrEvent = async ({ e }: NostrEventParams): Promise<NostrEvent> => {

    let persistedData = await getSecureState();
    
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