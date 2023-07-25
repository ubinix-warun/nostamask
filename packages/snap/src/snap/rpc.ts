import { heading, panel, text } from "@metamask/snaps-ui";
import { getAccountWithBip32Entropy0, getPublicKeyWithBip32 } from './private-key';
import { RequestErrors, SnapError } from "./errors";
import { BitcoinNetwork, ScriptType } from './utils';

export const getBip32E0Address = async (): Promise<string> => {
    const account = await getAccountWithBip32Entropy0();

    if (!account.address) {
        throw new Error('Address not found');
    }

    return account.address;

};

export const getBip32E0PublicKey = async (): Promise<string> => {

    return await getPublicKeyWithBip32();
};

export const getExtendedPublicKey = 
    async (origin: string, scriptType: ScriptType, network: BitcoinNetwork): 
        Promise<{xpub: string, mfp: string}> => {

    // const networkName = network == networks.bitcoin ? "mainnet" : "testnet";
    switch (scriptType) {
        case ScriptType.P2PKH:
        case ScriptType.P2WPKH:
        case ScriptType.P2SH_P2WPKH:
            const result = await snap.request({
                method: 'snap_dialog',
                params: {
                    type: 'confirmation',
                    content: panel([
                        heading('Access your extended public key'),
                        text(`Do you want to allow ${origin} to access Bitcoin  ${scriptType} extended public key?`),
                    ]),
                },
            });
            if(result) {
                // const { node: accountNode, mfp } = await extractAccountPrivateKey(snap, network, scriptType)
                // const accountPublicKey = accountNode.neutered();
                // const xpub = convertXpub(accountPublicKey.toBase58(), scriptType, network);

                // const snapNetwork = await getPersistedData(snap, "network", "");
                // if(!snapNetwork) {
                //     await updatePersistedData(snap, "network", getSnapTypeFromNetwork(network));
                // }

                // return { mfp, xpub };
            } else {
                throw SnapError.of(RequestErrors.RejectKey);
            }
            
        default:
            throw SnapError.of(RequestErrors.ScriptTypeNotSupport);
    }
}