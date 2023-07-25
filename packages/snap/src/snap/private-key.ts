import { SLIP10Node } from '@metamask/key-tree';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { BIP32Interface } from 'bip32';
import { BitcoinNetwork, ScriptType } from './utils';
import { Network, networks } from 'bitcoinjs-lib';

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

export const pathMap: Record<ScriptType, string[]> = {
  [ScriptType.P2PKH]: ['m', "44'", `0'`],
  [ScriptType.P2SH_P2WPKH]: ['m', "49'", `0'`],
  [ScriptType.P2WPKH]: ['m', "84'", `0'`]
}

export const CRYPTO_CURVE = "secp256k1";
export const trimHexPrefix = (key: string) => key.startsWith('0x') ? key.substring(2) : key;

export async function extractAccountPrivateKey(network: BitcoinNetwork, scriptType: ScriptType): Promise<{node:BIP32Interface, mfp: string | 0| undefined}> {
  const path = [...pathMap[scriptType]]

  const slip10Node = await snap.request({
      method: "snap_getBip32Entropy",
      params: {
          path,
          curve: CRYPTO_CURVE
      },
  }) as SLIP10Node
  const bip32 = BIP32Factory(ecc);
  const privateKeyBuffer = Buffer.from(trimHexPrefix(slip10Node.privateKey ?? ""), "hex")
  const chainCodeBuffer = Buffer.from(trimHexPrefix(slip10Node.chainCode), "hex")
  const node: BIP32Interface = bip32.fromPrivateKey(privateKeyBuffer, chainCodeBuffer, networks.bitcoin)
  //@ts-ignore
  // ignore checking since no function to set depth for node
  node.__DEPTH = slip10Node.depth;
  //@ts-ignore
  // ignore checking since no function to set index for node
  node.__INDEX = slip10Node.index;

  const mfp = slip10Node.masterFingerprint && slip10Node.masterFingerprint.toString(16)
  return {
      node: node.deriveHardened(0),
      mfp
  };
}

