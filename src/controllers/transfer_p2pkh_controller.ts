import { Request, Response } from 'express';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import ECPairFactory from 'ecpair';
import { getUtxos, broadcastTransaction } from '../services/quicknode_service.js';
import { getNetwork } from '../networks.js';

const ECPair = ECPairFactory(ecc);

export const transferP2pkh = async (req: Request, res: Response) => {
    console.log(req.body);
    const { toAddress, amount, fee, privateKey, network_name } = req.body;

    if (!toAddress || !amount || !fee || !privateKey || !network_name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const network = getNetwork(network_name);
        const amountInSatoshis = BigInt(Math.round(parseFloat(amount) * 100_000_000));
        const feeInSatoshis = BigInt(Math.round(parseFloat(fee) * 100_000_000));
        const privateKeyBuffer = Buffer.from(privateKey, 'hex');
        const keyPair = ECPair.fromPrivateKey(privateKeyBuffer, { network });

        const { address: fromAddress } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });

        if (!fromAddress) {
            return res.status(500).json({
                error: 'Could not derive address from the provided private key.'
            });
        }

        const utxos = await getUtxos(fromAddress);

        if (utxos.length === 0) {
            return res.status(400).json({ error: 'No spendable outputs found' });
        }

        const psbt = new bitcoin.Psbt({ network });
        let totalInput = BigInt(0);

        for (const utxo of utxos) {
            psbt.addInput({
                hash: utxo.txid,
                index: utxo.vout,
                nonWitnessUtxo: Buffer.from(utxo.hex, 'hex'),
            });
            
            const valueInSatoshis = Math.round(utxo.amount * 100_000_000);
            totalInput += BigInt(valueInSatoshis);
        }

        const change = totalInput - amountInSatoshis - feeInSatoshis;

        if (change < 0) {
            return res.status(400).json({ error: 'Insufficient funds for transaction' });
        }

        psbt.addOutput({ address: toAddress, value: amountInSatoshis });

        if (change > 0) {
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
