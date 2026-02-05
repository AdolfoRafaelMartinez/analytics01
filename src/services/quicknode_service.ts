import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.QUICKNODE_API_KEY;

if (!API_URL) {
    throw new Error("QuickNode API key is not set. Please set the QUICKNODE_API_KEY environment variable.");
}

export async function getUtxos(address: string) {
    const response = await axios.post(API_URL, {
        method: 'getutxos',
        params: [address, {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getutxos",
            "params": [
                address,
                "0",
                "9999999",
                false,
                {
                    "addresses": [address]
                }
            ]
        }]
    });
    return response.data.result;
}

export async function broadcastTransaction(txHex: string) {
    const response = await axios.post(API_URL, {
        method: 'sendrawtransaction',
        params: [txHex]
    });
    return response.data.result;
}

export async function getTxHex(txid: string) {
    const response = await axios.post(API_URL, {
        method: 'getrawtransaction',
        params: [txid, 0]
    });
    return response.data.result;
}
