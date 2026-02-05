import { Request, Response } from 'express';
import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import axios from 'axios';
import { ListUnspentResponse, Utxo, SendRawTransactionResponse } from '../types/quicknode.js';

const ECPair = ECPairFactory(ecc);

const QUICKNODE_API_KEY = process.env.QUICKNODE_API_KEY;
const QN_BTC_URL = `https://wispy-muddy-mound.btc-testnet4.quiknode.pro/${QUICKNODE_API_KEY}/`

export const transferBtc = async (req: Request, res: Response) => {
    const { fromAddress, toAddress, amount, privateKey } = req.body;

    try {
        const network = bitcoin.networks.testnet;
        const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'), { network });
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });

        if (address !== fromAddress) {
            return res.status(400).json({ error: 'Private key does not match from address' });
        }

        const utxosResponse = await axios.post<ListUnspentResponse>(QN_BTC_URL, {
            method: 'qn_listunspent',
            params: [fromAddress],
            id: 1,
            jsonrpc: '2.0'
        });

        const utxos: Utxo[] = utxosResponse.data.result;

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
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        psbt.addOutput({
            address: toAddress,
            value: amountToSendInSatoshis,
        });

        if (changeInSatoshis > BigInt(0)) {
            psbt.addOutput({
                address: fromAddress,
                value: changeInSatoshis,
            });
        }

        for (let i = 0; i < utxos.length; i++) {
            psbt.signInput(i, keyPair);
        }

        psbt.finalizeAllInputs();

        const txHex = psbt.extractTransaction().toHex();

        const sendResponse = await axios.post<SendRawTransactionResponse>(QN_BTC_URL, {
            method: 'sendrawtransaction',
            params: [txHex],
            id: 1,
            jsonrpc: '2.0'
        });

        res.json({ txHash: sendResponse.data.result });

    } catch (error) {
        console.error('Error sending BTC transaction:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred.' });
        }
    }
};
