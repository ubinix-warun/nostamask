// import { OnRpcRequestHandler, SnapsGlobalObject } from '@metamask/snaps-types';
// import { panel, text, heading, divider, copyable } from '@metamask/snaps-ui';
import { OnRpcRequestHandler, SnapsGlobalObject } from './snaps-types';
import { panel, text, heading, divider, copyable, form, input, InputTypes } from './snaps-ui';

import {
  getDefaultPublicKey,
  getSchnorrPublicKey,
  signNostrEvent
} from './snap/rpc';
import { NostrEventParams } from './snap/rpc-types';

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
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {
    case 'nostr_getDefaultPublicKey':
      return getDefaultPublicKey();
    case 'nostr_getSchnorrPublicKey':
      return getSchnorrPublicKey();
    case 'nostr_signNostrEvent':
      const confirmationResponse = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          // content: panel([heading('Hello, world!')])
          content: panel([
            heading('Confirm Sign NostrEvents'),
            divider(),
            text('Event:'),
            copyable(JSON.stringify(request.params)),
            form('myForm', [input('myInput')]),
            // input('myInput', InputTypes.Text, 'type here...', 'foo bar', 'input'),
          ]),
        },
      });
    
      if (confirmationResponse !== true) {
        throw new Error('Transaction must be approved by user');
      }
      return signNostrEvent(request.params as NostrEventParams);

    // case 'bip32e0_getBip32E0Address':
    //   return getBip32E0Address();
    // case 'bip32e0_getBip32E0PublicKey':
    //   return getBip32E0PublicKey();

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
      throw new Error('Method not found.');
  }
};
