import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import { payments } from 'bitcoinjs-lib';

const ECPair = ECPairFactory(ecc);

const wif = 'cQYBgCsbCjst9qWXyHxDfbGv6AhoVkAPJfQRJuvbtVYyNLru4RmK';

try {
  const keyPair = ECPair.fromWIF(wif);
  const { address } = payments.p2pkh({ pubkey: keyPair.publicKey });

  console.log(`The address for the given WIF is: ${address}`);
} catch (e: any) {
  console.error(`Error: ${e.message}`);
}
