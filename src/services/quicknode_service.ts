import axios from 'axios';
import { ListUnspentResponse, SendRawTransactionResponse, GetRawTransactionResponse } from '../types/quicknode.js';

const QUICKNODE_API_KEY = process.env.QUICKNODE_API_KEY;

if (!QUICKNODE_API_KEY) {
    throw new Error('QUICKNODE_API_KEY is not set. Please add it to your .env file.');
}

const QN_BTC_URL = `https://wispy-muddy-mound.btc-testnet4.quiknode.pro/${QUICKNODE_API_KEY}/`;

export const getUtxos = async (address: string) => {
    const response = await axios.post<ListUnspentResponse>(QN_BTC_URL, {
        method: 'qn_listunspent',
        params: [address],
        id: 1,
        jsonrpc: '2.0'
    });
    return response.data.result;
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
