import { SLIP10Node } from '@metamask/key-tree';

/**
 * Derive the single account we're using for this snap.
 * The path of the account is m/44'/1'/0'/0/0.
 */

// https://github.com/MetaMask/metamask-extension/blob/5b6439350ead4027a82f467675763fd9e1a12fcb/shared/constants/snaps.ts#L101

export const getAccountWithBip32Entropy0 = async (): Promise<SLIP10Node> => {
  const nostrNode = await snap.request({
    method: 'snap_getBip32Entropy',
    params: {
      // Must be specified exactly in the manifest
      path: ['m', "44'", "3'"], // Dogecoin!
      curve: 'secp256k1',
    },
  });

  // Next, create an instance of a SLIP-10 node for the Dogecoin node.
  const nostrSlip10Node = await SLIP10Node.fromJSON(nostrNode);

  return await nostrSlip10Node.derive(["bip32:0'"]);

};

export const getPublicKeyWithBip32 = async (): Promise<string> => {
  const nostrPublicKey = await snap.request({
    method: 'snap_getBip32PublicKey',
    params: {
      // The path and curve must be specified in the initial permissions.
      path: ['m', "44'", "3'", "0'", '0', '0'],
      curve: 'secp256k1',
      compressed: false,
    },
  });

  return nostrPublicKey;

};