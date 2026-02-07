
import { Request, Response } from 'express';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import * as ecc from 'tiny-secp256k1';
import ECPairFactory from 'ecpair';
import { BIP32Factory } from 'bip32';

// Initialize the libraries
const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);

export const getAddressFromMnemonic = (req: Request, res: Response) => {
    const { mnemonic, network_name, path: derivationPath } = req.body;

    if (!mnemonic || !bip39.validateMnemonic(mnemonic)) {
        return res.status(400).json({ error: 'Invalid mnemonic phrase provided.' });
    }

    const network = network_name === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed, network);

    if (!root.privateKey) {
        return res.status(500).json({ error: 'Could not generate master private key from seed.' });
    }
    
    // Derive the master address
    const { address: masterAddress } = bitcoin.payments.p2pkh({ pubkey: root.publicKey, network });

    const masterPrivateKey = root.privateKey.toString('hex');
    const masterPublicKey = root.publicKey.toString('hex');

    const path = derivationPath || `m/44'/1'/0'/0/0`;
    const child = root.derivePath(path);

    if (!child.privateKey) {
        return res.status(500).json({ error: 'Could not derive child private key for the given path.' });
    }

    const { address: childAddress } = bitcoin.payments.p2pkh({ pubkey: child.publicKey, network });

    res.json({ 
        address: childAddress,
        privateKey: child.toWIF(),
        privateKeyHex: child.privateKey.toString('hex'),
        publicKey: child.publicKey.toString('hex'),
        seed: seed.toString('hex'),
        masterPrivateKey,
        masterPublicKey,
        masterAddress // Now included
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