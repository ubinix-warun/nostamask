
import {generatePrivateKey} from 'nostr-tools'

export type SecureState = {
    sk: string
}

export const getSecureState = async (): Promise<SecureState> => {
    return (await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
    })) as SecureState;

}

export const initSecureState = async (): Promise<SecureState> => {

    let sk = generatePrivateKey() // `sk` is a hex string
    await snap.request({
        method: 'snap_manageState',
        params: { operation: 'update', newState: { sk: sk } },
    });

    return (await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
    })) as SecureState;

}

export const initSecureStateWithSK = async (sk: string): Promise<SecureState> => {

    await snap.request({
        method: 'snap_manageState',
        params: { operation: 'update', newState: { sk: sk } },
    });

    return (await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
    })) as SecureState;

}