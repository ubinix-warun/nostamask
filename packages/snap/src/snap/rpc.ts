import { getAccountWithBip32Entropy0, getPublicKeyWithBip32 } from './private-key';

export const getAddress = async (): Promise<string> => {
    const account = await getAccountWithBip32Entropy0();

    // const { address } = payments.p2pkh({
    //     pubkey: Buffer.from(account.compressedPublicKeyBytes),
    //     network: dogecoinNetwork,
    // });

    // account.

    if (!account.address) {
        throw new Error('Address not found');
    }

    return account.address;

};

export const getPublicKey = async (): Promise<string> => {
    // const account = await getAccount();

    // if (!account.publicKey) {
    //     throw new Error('PublicKey not found');
    // }

    // return account.publicKey;

    return await getPublicKeyWithBip32();
};