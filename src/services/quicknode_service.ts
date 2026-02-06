import axios from 'axios';
import { Utxo, SendRawTransactionResponse, GetRawTransactionResponse } from '../types/quicknode.js';

const QUICKNODE_API_KEY = process.env.QUICKNODE_API_KEY;

if (!QUICKNODE_API_KEY) {
    throw new Error('QUICKNODE_API_KEY is not set. Please add it to your .env file.');
}

const QN_BTC_URL = `https://wispy-muddy-mound.btc-testnet4.quiknode.pro/${QUICKNODE_API_KEY}/`;

// Internal type for the raw response from Blockbook
interface BlockbookUtxo {
    txid: string;
    vout: number;
    value: string; // Value is in satoshis as a string
}

interface BlockbookResponse {
    result: BlockbookUtxo[];
}

export const getUtxos = async (address: string): Promise<Utxo[]> => {
    // 1. Get the list of UTXOs from Blockbook
    const response = await axios.post<BlockbookResponse>(QN_BTC_URL, {
        method: 'bb_getUTXOs',
        params: [address, { confirmed: true }],
        id: 1,
        jsonrpc: '2.0'
    });

    const utxosFromBlockbook = response.data.result;

    // 2. For each UTXO, fetch the full transaction hex
    const utxos = await Promise.all(utxosFromBlockbook.map(async (utxo) => {
        const txHex = await getTxHex(utxo.txid);
        // 3. Construct the final Utxo object in the expected format
        return {
            txid: utxo.txid,
            vout: utxo.vout,
            amount: parseFloat(utxo.value) / 100000000, // Convert from satoshis to BTC
            hex: txHex,
        };
    }));

    return utxos;
};

export const broadcastTransaction = async (txHex: string) => {
    const response = await axios.post<SendRawTransactionResponse>(QN_BTC_URL, {
        method: 'sendrawtransaction',
        params: [txHex],
        id: 1,
        jsonrpc: '2.0'
    });
    return response.data.result;
};

export const getTxHex = async (txid: string) => {
    const response = await axios.post<GetRawTransactionResponse>(QN_BTC_URL, {
        method: 'getrawtransaction',
        params: [txid],
        id: 1,
        jsonrpc: '2.0'
    });
    return response.data.result;
};
