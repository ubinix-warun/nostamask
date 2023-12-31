
export async function parseDerivartionPath(path: string): Promise<number[]> {

  const [ m, node, coinType, account, change, addressIndex] = path.split('/')
  return [ 
      0, 
      Number(node.replace("'", '')),
      Number(coinType.replace("'", '')),
      Number(account.replace("'", '')),
      Number(change),
      Number(addressIndex),
    ]

}


/**
 * Return an array buffer from its hexadecimal representation.
 * @param hexString The hexadecimal string.
 */
export function fromHexString(hexString: string): ArrayBuffer {
    return new Uint8Array((hexString.match(/.{1,2}/g) ?? []).map(byte => parseInt(byte, 16))).buffer;
  }
  
  /**
   * Returns an hexadecimal representation of an array buffer.
   * @param bytes The array buffer.
   */
  export function toHexString(bytes: ArrayBuffer): string {
    return new Uint8Array(bytes).reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  }