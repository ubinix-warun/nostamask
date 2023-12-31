import { defaultSnapOrigin } from '@lib/env';
import { GetSnapsResponse, Snap } from '@lib/types/snap';
import type { NostrEventParams, RpcMethodTypes }  from '$fluffymask/snap/rpc-types';
import { UnsignedEvent } from 'nostr-tools';

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');

type SnapRpcRequestParams<M extends keyof RpcMethodTypes> =
  RpcMethodTypes[M]['input'] extends undefined
    ? { snapRpcMethod: M }
    : { snapRpcMethod: M; params: RpcMethodTypes[M]['input'] };

const snapNostrRpcRequest = async <M extends keyof RpcMethodTypes>(
  args: SnapRpcRequestParams<M>,
) => {
  const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: `nostr_${args.snapRpcMethod}`,
        params: 'params' in args ? args.params : undefined,
      },
    },
  });

  return result as unknown as RpcMethodTypes[M]['output'];
};

export const getNostrDefaultPublicKey = async () => {
  return snapNostrRpcRequest({
    snapRpcMethod: 'getDefaultPublicKey',
  });
};

export const getSchnorrPublicKey = async () => {
  return snapNostrRpcRequest({
    snapRpcMethod: 'getSchnorrPublicKey',
  });
};

export const isExistsSchnorrPublicKey = async () => {
  return snapNostrRpcRequest({
    snapRpcMethod: 'isExistsSchnorrPublicKey',
  });
};

export const signNostrEvent = async (e: any) => {
  return snapNostrRpcRequest({
    snapRpcMethod: 'signNostrEvent',
    params: { e }  as NostrEventParams
  });
};
