import { Request, Response } from 'express';
import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import { getUtxos, broadcastTransaction } from '../services/quicknode_service.js';
import { Utxo } from '../types/quicknode.js';

const ECPair = ECPairFactory(ecc);

export const transferBtc = async (req: Request, res: Response) => {
    const { fromAddress, toAddress, amount, privateKey } = req.body;

    if (!fromAddress || !toAddress || !amount || !privateKey) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const network = bitcoin.networks.testnet;
        const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'), { network });

        // 1. Get UTXOs using the service
        const utxos: Utxo[] = await getUtxos(fromAddress);

        if (utxos.length === 0) {
            return res.status(400).json({ error: 'No unspent transaction outputs found' });
        }

        const psbt = new bitcoin.Psbt({ network });
        const SATOSHIS_PER_BTC = 100_000_000;
        let totalInputInSatoshis = BigInt(0);

        for (const utxo of utxos) {
            const utxoAmountInSatoshis = BigInt(Math.floor(utxo.amount * SATOSHIS_PER_BTC));
            totalInputInSatoshis += utxoAmountInSatoshis;
            psbt.addInput({
                hash: utxo.txid,
                index: utxo.vout,
                nonWitnessUtxo: Buffer.from(utxo.hex, 'hex'),
            });
        }

        const amountToSendInSatoshis = BigInt(Math.floor(amount * SATOSHIS_PER_BTC));
        const feeInSatoshis = BigInt(10000); // a fixed fee for simplicity
        const changeInSatoshis = totalInputInSatoshis - amountToSendInSatoshis - feeInSatoshis;

        if (totalInputInSatoshis < amountToSendInSatoshis + feeInSatoshis) {
            return res.status(400).json({ error: 'Insufficient funds for transaction and fee' });
        }

        psbt.addOutput({
            address: toAddress,
            value: amountToSendInSatoshis,
        });

        if (changeInSatoshis > BigInt(0)) {
            psbt.addOutput({
                address: fromAddress, // Send change back to the sender
                value: changeInSatoshis,
            });
        }

        // Sign all inputs
        for (let i = 0; i < utxos.length; i++) {
            psbt.signInput(i, keyPair);
        }

        // Finalize all inputs
        psbt.finalizeAllInputs();

        // Extract the raw transaction hex
        const txHex = psbt.extractTransaction().toHex();

        // 2. Broadcast the transaction using the service
        const txid = await broadcastTransaction(txHex);

        res.json({ txid });

    } catch (error) {
        console.error('Error sending BTC transaction:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred.' });
        }
    }
};
