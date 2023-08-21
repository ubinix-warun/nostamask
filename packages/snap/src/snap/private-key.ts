import { SLIP10Node, JsonBIP44CoinTypeNode, getBIP44AddressKeyDeriver, BIP44Node } from '@metamask/key-tree';
import { SnapsGlobalObject } from 'navh-metamask-snaps-types';
import { parseDerivartionPath } from './utils';

export async function getAccountFromWallet(snap: SnapsGlobalObject, path?: string, index?: number): Promise<BIP44Node> {

  const defaultDerivationPath = "m/44'/0'/0'/0/0"  // 0' BTC Mainnet!
  // "m/44'/0'/0'/0/0" P2PKH
  // "m/49'/0'/0'/0/0" P2SH_P2WPKH
  // "m/84'/0'/0'/0/0" P2WPKH

  const [, , coinType, account, change, addressIndex] = path !== undefined ? 
          await parseDerivartionPath(path) : await parseDerivartionPath(defaultDerivationPath);
  
  const bip44Node = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: coinType,
    },
  });
  
  const addressKeyDeriver = await getBIP44AddressKeyDeriver(bip44Node as JsonBIP44CoinTypeNode, {
    account: account,
    change: change,
  });

  return await addressKeyDeriver(Number(index ?? addressIndex));

}

