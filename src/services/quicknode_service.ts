import axios from 'axios';
import { Utxo, SendRawTransactionResponse, GetRawTransactionResponse, GetRawTransactionVerboseResponse } from '../types/quicknode.js';

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
    result: BlockbookUtxo[] | null;
    error: any;
}

export const qn_getUtxos = async (address: string): Promise<Utxo[]> => {
    const response = await axios.post<BlockbookResponse>(QN_BTC_URL, {
        method: 'bb_getUTXOs',
        params: [address, { confirmed: true }],
        id: 1,
        jsonrpc: '2.0'
    });

    if (response.data.error) {
        throw new Error(`Failed to get UTXOs: ${response.data.error.message}`);
    }
    
    // Handle case where no UTXOs are found
    const utxosFromBlockbook = response.data.result;
    if (!utxosFromBlockbook) {
        return [];
    }

    const utxos = await Promise.all(utxosFromBlockbook.map(async (utxo) => {
        const txHex = await qn_getTxHex(utxo.txid);
        return {
            txid: utxo.txid,
            vout: utxo.vout,
            amount: parseFloat(utxo.value) / 100000000, // Convert from satoshis to BTC
            hex: txHex,
        };
    }));

    return utxos;
};

export const qn_broadcastTransaction = async (txHex: string): Promise<string> => {
    const response = await axios.post<SendRawTransactionResponse>(QN_BTC_URL, {
        method: 'sendrawtransaction',
        params: [txHex],
        id: 1,
        jsonrpc: '2.0'
    });

    if (response.data.error) {
        throw new Error(`Failed to broadcast transaction: ${response.data.error.message}`);
    }

    if (!response.data.result) {
        throw new Error('Broadcast failed: Node did not return a transaction hash.');
    }

    return response.data.result;
};

export const qn_getTxHex = async (txid: string): Promise<string> => {
    const response = await axios.post<GetRawTransactionResponse>(QN_BTC_URL, {
        method: 'getrawtransaction',
        params: [txid],
        id: 1,
        jsonrpc: '2.0'
    });
    if (response.data.error) {
        throw new Error(`Failed to get raw transaction ${txid}: ${response.data.error.message}`);
    }
    if (!response.data.result) {
        throw new Error(`No result for raw transaction ${txid}`);
    }
    return response.data.result;
};


export const qn_getBalance = async (address: string, network: string): Promise<number> => {
    const apiKey = process.env.QUICKNODE_API_KEY;
    if (!apiKey) {
        throw new Error('QUICKNODE_API_KEY is not set. Please add it to your .env file.');
    }

    let url: string;
    if (network === 'testnet') {
        url = `https://wispy-muddy-mound.btc-testnet4.quiknode.pro/${apiKey}/`;
    } else if (network === 'mainnet') {
        // IMPORTANT: You will need a QuickNode mainnet endpoint for this to work.
        // Replace 'your-mainnet-endpoint' with your actual endpoint ID.
        url = `https://your-mainnet-endpoint.btc.quiknode.pro/${apiKey}/`;
    } else {
        throw new Error(`Unsupported network: ${network}. Please use 'mainnet' or 'testnet'.`);
    }


    const response = await axios.post<BlockbookResponse>(url, {
        method: 'bb_getUTXOs',
        params: [address, { confirmed: true }],
        id: 1,
        jsonrpc: '2.0'
    });

    const utxosFromBlockbook = response.data.result;

    if (!utxosFromBlockbook) {
        return 0;
    }

    const totalSatoshis = utxosFromBlockbook.reduce((acc, utxo) => acc + parseInt(utxo.value, 10), 0);
    const balanceInBtc = totalSatoshis / 100000000;

    return balanceInBtc;
};

export const qn_getTransactionStatus = async (txid: string, network: string): Promise<{ confirmations: number; fee: number; eta: string; }> => {
    const apiKey = process.env.QUICKNODE_API_KEY;
    if (!apiKey) {
        throw new Error('QUICKNODE_API_KEY is not set.');
    }

    let url: string;
    if (network === 'testnet') {
        url = `https://wispy-muddy-mound.btc-testnet4.quiknode.pro/${apiKey}/`;
    } else if (network === 'mainnet') {
        url = `https://your-mainnet-endpoint.btc.quiknode.pro/${apiKey}/`;
    } else {
        throw new Error(`Unsupported network: ${network}. Please use 'mainnet' or 'testnet'.`);
    }

    const response = await axios.post<GetRawTransactionVerboseResponse>(url, {
        method: 'getrawtransaction',
        params: [txid, true], // Verbose output to get confirmations
        id: 1,
        jsonrpc: '2.0'
    });

    if (response.data.error) {
        throw new Error(response.data.error.message || 'Error fetching transaction from node.');
    }
    
    if (response.data.result) {
        const feeInBtc = Math.abs(response.data.result.fee || 0);
        const feeInSatoshis = Math.round(feeInBtc * 100000000);
        const confirmations = response.data.result.confirmations ?? 0;
        const eta = confirmations > 0 ? 'Confirmed' : '~10 minutes';

        return {
            confirmations,
            fee: feeInSatoshis,
            eta,
        };
    }

    throw new Error('Transaction not found.');
};