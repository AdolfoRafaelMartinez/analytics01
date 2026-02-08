import { Request, Response } from 'express';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import { BIP32Factory } from 'bip32';
import { getTransactionStatus } from '../services/quicknode_service.js';
import { getNetwork } from '../networks.js';

// Initialize the libraries
const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);

export const getAddressFromMnemonic = (req: Request, res: Response) => {
    const { mnemonic, network_name, path: derivationPath } = req.body;

    if (!mnemonic || !bip39.validateMnemonic(mnemonic)) {
        return res.status(400).json({ error: 'Invalid mnemonic phrase provided.' });
    }

    const network = getNetwork(network_name);
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    
    // --- Non-HD Key Pair Generation ---
    const nonHdPrivateKeyBuffer = seed.slice(0, 32);
    const nonHdKeyPair = ECPair.fromPrivateKey(nonHdPrivateKeyBuffer, { network });
    const nonHdAddress = bitcoin.payments.p2pkh({ pubkey: nonHdKeyPair.publicKey, network }).address;
    const nonHdPublicKeyHex = Array.from(nonHdKeyPair.publicKey).map((b: any) => b.toString(16).padStart(2, '0')).join('');

    // --- HD Wallet (BIP-32) Derivation ---
    const root = bip32.fromSeed(seed, network);

    if (!root.privateKey) {
        return res.status(500).json({ error: 'Could not generate master private key from seed.' });
    }
    
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
        // HD Child Key
        address: childAddress,
        privateKey: child.toWIF(),
        privateKeyHex: child.privateKey.toString('hex'),
        publicKey: child.publicKey.toString('hex'),
        seed: seed.toString('hex'),
        
        // HD Master Key
        masterPrivateKey,
        masterPublicKey,
        masterAddress,

        // Non-HD Key
        nonHdAddress: nonHdAddress,
        nonHdPrivateKeyWIF: nonHdKeyPair.toWIF(),
        nonHdPrivateKeyHex: nonHdPrivateKeyBuffer.toString('hex'),
        nonHdPublicKey: nonHdPublicKeyHex
    });
};

export const getAddressFromPrivateKey = (req: Request, res: Response) => {
    const { privateKey, network_name } = req.body;
    const network = getNetwork(network_name);

    try {
        const privateKeyBuffer = Buffer.from(privateKey, 'hex');
        const keyPair = ECPair.fromPrivateKey(privateKeyBuffer, { network });
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
        res.json({ address });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const postPrivateKeyToAddressPage = (req: Request, res: Response) => {
    const { privateKey, network_name } = req.body;
    const network = getNetwork(network_name);
    let address = null;
    let error = null;

    try {
        const privateKeyBuffer = Buffer.from(privateKey, 'hex');
        const keyPair = ECPair.fromPrivateKey(privateKeyBuffer, { network });
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
        const network = getNetwork(network_name);
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

export const getConfirmations = async (req: Request, res: Response) => {
    const { txid, network } = req.body;
    let confirmations: number | null = null;
    let fee: number | null = null;
    let eta: string | null = null;
    let error: string | null = null;

    if (txid && network) {
        try {
            const status = await getTransactionStatus(txid, network);
            confirmations = status.confirmations;
            fee = status.fee;
            eta = status.eta;
        } catch (e: any) {
            error = e.message;
        }
    }

    res.render('confirmations', { 
        transactionId: txid || '', 
        confirmations, 
        fee,
        eta,
        error 
    });
};