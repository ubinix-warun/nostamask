import { OnRpcRequestHandler } from '@metamask/snaps-types';
import type { SnapsGlobalObject } from '@metamask/rpc-methods';
import { panel, text } from '@metamask/snaps-ui';

import {
  getBip32E0Address, 
  getBip32E0PublicKey,
  getExtendedPublicKey
} from './snap/rpc';
import { RequestErrors, SnapError } from './snap/errors';
import { BitcoinNetwork, ScriptType } from './snap/utils';


declare let snap: SnapsGlobalObject;

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'fluffymask_getExtendedPublicKey':
      return getExtendedPublicKey(
          origin,
          ScriptType.P2WPKH,
          BitcoinNetwork.Test
        );
    case 'fluffymask_getBip32E0Address':
      return getBip32E0Address();
    case 'fluffymask_getBip32E0PublicKey':
      return getBip32E0PublicKey();

    // case 'hello':
    //   return snap.request({
    //     method: 'snap_dialog',
    //     params: {
    //       type: 'confirmation',
    //       content: panel([
    //         text(`Hello, **${origin}**!`),
    //         text('This custom confirmation is just for display purposes.'),
    //         text(
    //           'But you can edit the snap source code to make it do something, if you want to!',
    //         ),
    //       ]),
    //     },
    //   });
    default:
      throw SnapError.of(RequestErrors.MethodNotSupport);
  }
};
