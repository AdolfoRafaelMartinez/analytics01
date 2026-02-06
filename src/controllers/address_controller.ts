import { Request, Response } from 'express';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import * as ecc from 'tiny-secp256k1';
import ECPairFactory from 'ecpair';
import { BIP32Factory } from 'bip32';

// Initialize the libraries
const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);

// A simple in-memory cache for the wallets
const walletCache = new Map<string, any>();

export const getAddressFromMnemonic = (req: Request, res: Response) => {
    const { mnemonic, network_name } = req.body;
    const network = network_name === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed);
    root.network = network;

    const path = `m/44\'/0\'/0\'/0/0`;
    const child = root.derivePath(path);

    if (!child.privateKey) {
        return res.status(500).json({ error: 'Could not derive private key.' });
    }

    const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey, network });

    res.json({ 
        address,
        privateKey: child.toWIF(),
        privateKeyHex: child.privateKey.toString('hex'),
        publicKey: child.publicKey.toString('hex')
    });
};

export const getAddressFromPrivateKey = (req: Request, res: Response) => {
    const { privateKey, network_name } = req.body;
    const network = network_name === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;

    try {
        const keyPair = ECPair.fromWIF(privateKey, network);
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
        res.json({ address });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const postPrivateKeyToAddressPage = (req: Request, res: Response) => {
    const { privateKey, network_name } = req.body;
    const network = network_name === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
    let address = null;
    let error = null;

    try {
        const keyPair = ECPair.fromWIF(privateKey, network);
        const p2pkh = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
        address = p2pkh.address;
    } catch (e: any) {
        error = e.message;
    }

    res.render('private-key-to-address', { address, error });
};

export const convertWifToHex = (req: Request, res: Response) => {
    const { wif, network_name } = req.body;
    if (!wif) {
        return res.status(400).json({ error: 'WIF key is required' });
    }
    try {
        const network = network_name === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
        const keyPair = ECPair.fromWIF(wif, network);
        if (keyPair.privateKey) {
            const hex = keyPair.privateKey.toString('hex');
            res.json({ hex });
        } else {
            res.status(400).json({ error: 'Private key could not be derived from WIF' });
        }
    } catch (error: any) {
        res.status(400).json({ error: 'Invalid WIF key' });
    }
};


export const createWallet = (req: Request, res: Response) => {
    const mnemonic = bip39.generateMnemonic();
    res.json({ mnemonic });
};
