import { Kind0UserData } from '@lib/utils/nostr'
import type { NextApiRequest, NextApiResponse } from 'next'

import {
  nip19,
    relayInit,
  } from 'nostr-tools'

// import { config as loadEnv } from "dotenv";
// import { SDK, Auth, TEMPLATES, Metadata } from "@infura/sdk";

// loadEnv(); // Move this to Server script!

// // Create Auth object
// const auth = new Auth({
//   projectId: process.env.INFURA_API_KEY,
//   secretId: process.env.INFURA_API_KEY_SECRET,
//   privateKey: process.env.WALLET_PRIVATE_KEY,
//   chainId: 1,
// });

export default async function userHandler(
    req: NextApiRequest,
    res: NextApiResponse<Kind0UserData>
  ) {
    const { query, method } = req;
    const pubkey = (query.pubkey as string);
  
    const relay = relayInit('wss://nostr-pub.wellorder.net');
    relay.on('connect', () => {
        console.log(`connected to ${relay.url}`);
    });
    relay.on('error', () => {
        console.log(`failed to connect to ${relay.url}`);
    });
    // relay.on('disconnect', () => {
    //   console.log(`disconnected to ${relay.url}`);
    // });

    await relay.connect();

    let event = await relay.get({
        authors: [pubkey],
        kinds: [0]
    });

    if(event == null || event?.content == undefined) 
        res.status(404).end(`Metadata's not found: ${pubkey}`);


    let metadata =  JSON.parse(event?.content ?? "")
    metadata.npub = nip19.npubEncode(pubkey);

    switch (method) {
        case 'GET':
          res.status(200).json(
              metadata
            );
          break
        default:
          res.setHeader('Allow', ['GET']);
          res.status(405).end(`Method ${method} Not Allowed`);
    }

}