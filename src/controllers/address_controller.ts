import { Request, Response } from 'express';
import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';

const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);

export const createWallet = (req: Request, res: Response) => {
    const network = bitcoin.networks.testnet;
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed, network);

    const path = "m/44'/1'/0'/0/0";
    const child = root.derivePath(path);
    const privateKey = child.privateKey!.toString('hex');
    const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey, network });

    res.json({ mnemonic, privateKey, address, path });
};

export const getAddressFromMnemonic = async (req: Request, res: Response) => {
    const { mnemonic, path, coinType } = req.body;
    const network = bitcoin.networks.testnet;

    try {
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = bip32.fromSeed(seed, network);
        const child = root.derivePath(path);
        
        const privateKeyHex = child.privateKey!.toString('hex');
        const privateKeyWIF = child.toWIF();

        const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey, network });

        res.render('mnemonic-to-private-key', {
            mnemonic,
            path,
            coinType,
            privateKeyHex,
            privateKeyWIF,
            address,
            error: null
        });
    } catch (error: any) {
        res.render('mnemonic-to-private-key', {
            mnemonic: mnemonic || '',
            path: path || "m/44'/1'/0'/0/0",
            coinType: coinType || '1',
            privateKeyHex: null,
            privateKeyWIF: null,
            address: null,
            error: error.message
        });
    }
};

export const getAddressFromPrivateKey = (req: Request, res: Response) => {
    const { privateKey } = req.body;
    const network = bitcoin.networks.testnet;

    try {
        const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'), { network });
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
        res.render('private-key-to-address', { privateKey, address, error: null });
    } catch (error: any) {
        res.render('private-key-to-address', { privateKey, address: null, error: error.message });
    }
};
