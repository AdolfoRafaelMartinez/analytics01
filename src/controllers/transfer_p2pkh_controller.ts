import { Request, Response } from 'express';
import * as bitcoin from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import { getUtxos, broadcastTransaction, getTxHex } from '../services/quicknode_service.js';
import { getNetwork } from '../networks.js';

const ECPair = ECPairFactory(ecc);

// Define the dust threshold for P2PKH outputs in satoshis
const DUST_THRESHOLD = BigInt(546);

export const transferBtcP2pkh = async (req: Request, res: Response) => {
    const { fromAddress, toAddress, amount, privateKey, network_name } = req.body;
    const network = getNetwork(network_name);

    if (!fromAddress || !toAddress || !amount || !privateKey) {
        return res.status(400).json({ error: 'Missing required parameters.' });
    }

    try {
        const keyPair = ECPair.fromWIF(privateKey, network);
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });

        if (address !== fromAddress) {
            return res.status(400).json({ error: 'Private key does not match the from address.' });
        }

        const utxos = await getUtxos(fromAddress);
        if (utxos.length === 0) {
            return res.status(400).json({ error: 'No UTXOs found.' });
        }

        const fee = BigInt(10000); // Use BigInt for fees
        const amountInSatoshis = BigInt(Math.floor(amount * 100_000_000)); // Convert to satoshis as BigInt
        let totalInput = BigInt(0);

        const psbt = new bitcoin.Psbt({ network });

        // Use a Map to store transaction hex values to avoid redundant fetches
        const txHexCache = new Map<string, string>();

        for (const utxo of utxos) {
            totalInput += BigInt(Math.floor(utxo.amount * 100_000_000));
            let nonWitnessUtxoHex = txHexCache.get(utxo.txid);
            if (!nonWitnessUtxoHex) {
                nonWitnessUtxoHex = await getTxHex(utxo.txid);
                txHexCache.set(utxo.txid, nonWitnessUtxoHex);
            }
            
            psbt.addInput({
                hash: utxo.txid,
                index: utxo.vout,
                nonWitnessUtxo: Buffer.from(nonWitnessUtxoHex, 'hex'),
            });
        }

        if (totalInput < amountInSatoshis + fee) {
            return res.status(400).json({ error: 'Insufficient funds for transaction plus fee.' });
        }

        psbt.addOutput({ address: toAddress, value: amountInSatoshis });

        const change = totalInput - amountInSatoshis - fee;
        if (change > DUST_THRESHOLD) {
            psbt.addOutput({ address: fromAddress, value: change });
        }

        for (let i = 0; i < utxos.length; i++) {
            psbt.signInput(i, keyPair);
        }

        psbt.finalizeAllInputs();

        const txHex = psbt.extractTransaction().toHex();
        const txid = await broadcastTransaction(txHex);

        res.json({ txid });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
