import axios from 'axios';
import { Utxo } from '../types/quicknode.js';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

if (!ALCHEMY_API_KEY) {
    throw new Error('ALCHEMY_API_KEY is not set. Please add it to your .env file.');
}

const ALCHEMY_BTC_URL = `https://bitcoin-testnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

// --- Type Definitions for Alchemy API Responses ---

interface AlchemyError {
    code: number;
    message: string;
}

interface AlchemyJsonRpcResponse<T> {
    jsonrpc: string;
    id: number;
    result?: T;
    error?: AlchemyError;
}

interface AlchemyUtxoDto {
    txid: string;
    vout: number;
    value: string; // Value is in satoshis as a string
}

interface AlchemyGetUtxosResult {
    utxos: AlchemyUtxoDto[];
}

interface AlchemyTransactionVerbose {
    txid: string;
    confirmations?: number;
    fee?: number;
    hex: string;
}

type AlchemyGetUtxosResponse = AlchemyJsonRpcResponse<AlchemyGetUtxosResult>;
type AlchemySendRawTransactionResponse = AlchemyJsonRpcResponse<string>;
type AlchemyGetRawTransactionResponse = AlchemyJsonRpcResponse<string>;
type AlchemyGetRawTransactionVerboseResponse = AlchemyJsonRpcResponse<AlchemyTransactionVerbose>;

// --- Service Functions ---

export const getUtxos = async (address: string): Promise<Utxo[]> => {
    const response = await axios.post<AlchemyGetUtxosResponse>(ALCHEMY_BTC_URL, {
        method: 'alchemy_getUtxos',
        params: [address],
        id: 1,
        jsonrpc: '2.0'
    });

    if (response.data.error) {
        throw new Error(`Failed to get UTXOs: ${response.data.error.message}`);
    }

    const utxosFromResult = response.data.result?.utxos;
    if (!utxosFromResult) {
        return [];
    }

    const utxos = await Promise.all(utxosFromResult.map(async (utxo) => {
        const txHex = await getTxHex(utxo.txid);
        return {
            txid: utxo.txid,
            vout: utxo.vout,
            amount: parseInt(utxo.value, 10) / 100000000, // Convert from satoshis to BTC
            hex: txHex,
        };
    }));

    return utxos;
};

export const broadcastTransaction = async (txHex: string, network: string): Promise<string> => {
    const response = await axios.post<AlchemySendRawTransactionResponse>(ALCHEMY_BTC_URL, {
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

export const getBalance = async (address: string, network: string): Promise<number> => {
    const utxos = await getUtxos(address);
    const totalSatoshis = utxos.reduce((acc, utxo) => acc + (utxo.amount * 100000000), 0);
    return totalSatoshis / 100000000;
};

export const getTxHex = async (txid: string): Promise<string> => {
    const response = await axios.post<AlchemyGetRawTransactionResponse>(ALCHEMY_BTC_URL, {
        method: 'getrawtransaction',
        params: [txid, false],
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

export const getTransactionStatus = async (txid: string, network: string): Promise<{ confirmations: number; fee: number; eta: string; }> => {
    const response = await axios.post<AlchemyGetRawTransactionVerboseResponse>(ALCHEMY_BTC_URL, {
        method: 'getrawtransaction',
        params: [txid, true],
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
