import { Request, Response } from 'express';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import * as quicknodeService from '../services/quicknode_service.js';
import * as blockdaemonService from '../services/blockdaemon_service.js';
import { getNetwork } from '../networks.js';
import { Utxo } from '../types/quicknode.js';

const ECPair = ECPairFactory(ecc);

export const qn_createAndSendTransaction = async (req: Request, res: Response) => {
    const { toAddress, amount, fee, privateKey, network_name, service } = req.body;

    if (!toAddress || !amount || !fee || !privateKey || !network_name || !service) {
        return res.redirect(`/transfer-p2pkh?error=${encodeURIComponent('Missing required fields')}`);
    }

    try {
        const network = getNetwork(network_name);
        const amountInSatoshis = Math.round(parseFloat(amount) * 100_000_000);
        const feeInSatoshis = Math.round(parseFloat(fee) * 100_000_000);
        const privateKeyBuffer = Buffer.from(privateKey, 'hex');
        const keyPair = ECPair.fromPrivateKey(privateKeyBuffer, { network });

        const { address: fromAddress } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });

        if (!fromAddress) {
             return res.redirect(`/transfer-p2pkh?error=${encodeURIComponent('Could not derive address from the provided private key.')}`);
        }

        let utxos: Utxo[];
        let getTxHex: (txid: string) => Promise<string>;
        let broadcastTransaction: (txHex: string) => Promise<string>;

        if (service === 'quicknode') {
            utxos = await quicknodeService.qn_getUtxos(fromAddress);
            getTxHex = quicknodeService.qn_getTxHex;
            broadcastTransaction = quicknodeService.qn_broadcastTransaction;
        } else if (service === 'blockdaemon') {
            utxos = await blockdaemonService.getUtxos(fromAddress, network_name);
            getTxHex = (txid: string) => blockdaemonService.getTxHex(txid, network_name);
            broadcastTransaction = (txHex: string) => blockdaemonService.broadcastTransaction(txHex, network_name);
        } else {
             return res.redirect(`/transfer-p2pkh?error=${encodeURIComponent('Invalid service provider')}`);
        }

        if (utxos.length === 0) {
            return res.redirect(`/transfer-p2pkh?error=${encodeURIComponent('No spendable outputs found')}`);
        }

        const psbt = new bitcoin.Psbt({ network });
        let totalInput = 0;

        for (const utxo of utxos) {
            psbt.addInput({
                hash: utxo.txid,
                index: utxo.vout,
                nonWitnessUtxo: Buffer.from(await getTxHex(utxo.txid), 'hex'),
            });
            
            const valueInSatoshis = Math.round(utxo.amount * 100_000_000);
            totalInput += valueInSatoshis;
        }

        const change = totalInput - amountInSatoshis - feeInSatoshis;

        if (change < 0) {
            return res.redirect(`/transfer-p2pkh?error=${encodeURIComponent('Insufficient funds for transaction')}`);
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

        res.redirect(`/transaction?txid=${txid}&network=${network_name}`);
    } catch (error: any) {
        res.redirect(`/transfer-p2pkh?error=${encodeURIComponent(error.message)}`);
    }
};