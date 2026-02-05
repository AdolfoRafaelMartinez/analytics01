import { Request, Response } from 'express';
import * as bitcoin from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';

const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);

export const getAddressFromPrivateKey = async (req: Request, res: Response) => {
    const { privateKey, network_name } = req.body;

    if (!privateKey) {
        return res.status(400).json({ error: 'Private key is required' });
    }

    const network = network_name === 'testnet' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;

    try {
        const keyPair = ECPair.fromWIF(privateKey, network);
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });

        if (address) {
            res.json({ address });
        } else {
            res.status(400).json({ error: 'Invalid private key' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deriving address' });
    }
};

export const getAddressFromMnemonic = async (req: Request, res: Response) => {
    const { mnemonic, network_name } = req.body;

    if (!mnemonic) {
        return res.status(400).json({ error: 'Mnemonic is required' });
    }

    const network = network_name === 'testnet' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;

    try {
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = bip32.fromSeed(seed, network);
        const path = "m/44'/0'/0'/0/0";
        const child = root.derivePath(path);
        const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey, network });
        const privateKey = child.toWIF();


        if (address) {
            res.json({ address, privateKey });
        } else {
            res.status(400).json({ error: 'Invalid mnemonic' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error deriving address' });
    }
};

export const createWallet = async (req: Request, res: Response) => {
    const { network_name } = req.body;
    const network = network_name === 'testnet' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;

    try {
        const mnemonic = bip39.generateMnemonic();
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = bip32.fromSeed(seed, network);
        const path = "m/44'/0'/0'/0/0";
        const child = root.derivePath(path);
        const address = bitcoin.payments.p2pkh({ pubkey: child.publicKey, network }).address!;
        const privateKey = child.toWIF();

        res.json({
            mnemonic,
            privateKey,
            address
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create wallet' });
    }
};

export const getPrivateKeyToAddressPage = (req: Request, res: Response) => {
    res.render('private-key-to-address', { privateKey: null, address: null, error: null });
};

export const postPrivateKeyToAddressPage = (req: Request, res: Response) => {
    const { privateKey, network_name } = req.body;

    if (!privateKey) {
        return res.render('private-key-to-address', { privateKey: null, address: null, error: 'Private key is required' });
    }

    const network = network_name === 'testnet' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;

    try {
        const keyPair = ECPair.fromWIF(privateKey, network);
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
        res.render('private-key-to-address', { privateKey, address, error: null });
    } catch (error: any) {
        res.render('private-key-to-address', { privateKey, address: null, error: error.message });
    }
};
