import axios from 'axios';
import { Utxo } from '../types/quicknode.js'; // Assuming Utxo type is reusable

const BLOCKDAEMON_API_KEY = process.env.BLOCKDAEMON_API_KEY;

if (!BLOCKDAEMON_API_KEY) {
    throw new Error('BLOCKDAEMON_API_KEY is not set. Please add it to your .env file.');
}

// --- Axios Instance for Blockdaemon API ---
const blockdaemonApi = axios.create({
    headers: {
        'Authorization': `Bearer ${BLOCKDAEMON_API_KEY}`,
        'Content-Type': 'application/json'
    }
});

const getRpcUrl = (network: string): string => {
    if (network === 'mainnet') {
        return 'https://svc.blockdaemon.com/bitcoin/mainnet/native';
    } else if (network === 'testnet4') {
        // As per the previous request, using testnet4. Adjust if needed.
        return 'https://svc.blockdaemon.com/bitcoin/testnet4/native';
    } else {
        throw new Error(`Unsupported network for Blockdaemon: ${network}`);
    }
};


// --- Type Definitions for Blockdaemon API Responses ---

interface JsonRpcResponse<T> {
    jsonrpc: string;
    id: string | number;
    result?: T;
    error?: { code: number; message: string; };
}

interface BlockdaemonUtxoDto {
    txid: string;
    vout: number;
    value: number; // Value is in BTC
    scriptPubKey: string;
}

interface VerboseTransaction {
    txid: string;
    confirmations?: number;
    fee?: number;
    hex: string;
}

// --- Service Functions ---

export const bd_getBlockchainHeight = async (network: string): Promise<number> => {
    const url = getRpcUrl(network);
    const response = await blockdaemonApi.post<JsonRpcResponse<number>>(url, {
        jsonrpc: '2.0',
        id: 'blockdaemon-getblockcount',
        method: 'getblockcount',
        params: []
    });

    if (response.data.error) {
        throw new Error(`Failed to get block count: ${response.data.error.message}`);
    }
    if (typeof response.data.result !== 'number') {
        throw new Error('Unexpected result format for getblockcount');
    }
    return response.data.result;
};

export const bd_getTxHex = async (txid: string, network: string): Promise<string> => {
    const url = getRpcUrl(network);
    const response = await blockdaemonApi.post<JsonRpcResponse<string>>(url, {
        jsonrpc: '2.0',
        id: 'blockdaemon-getrawtransaction',
        method: 'getrawtransaction',
        params: [txid]
    });

    if (response.data.error) {
        throw new Error(`Failed to get raw transaction hex: ${response.data.error.message}`);
    }
    if (!response.data.result) {
        throw new Error('No result for getrawtransaction');
    }
    return response.data.result;
};

export const bd_getUtxos = async (address: string, network: string): Promise<Utxo[]> => {
    const url = getRpcUrl(network);
    const response = await blockdaemonApi.post<JsonRpcResponse<BlockdaemonUtxoDto[]>>(url, {
        jsonrpc: '2.0',
        id: 'blockdaemon-getaddressutxos', // method not exist
        method: 'getaddressutxos',
        params: [{ "addresses": [address] }]
    });

    const { result, error } = response.data;

    if (error) {
        throw new Error(`Failed to get UTXOs: ${error.message}`);
    }
    if (!result) {
        return [];
    }

    // The getaddressutxos method might not return the full transaction hex needed for the Utxo type.
    // We need to fetch it for each UTXO.
    const utxos = await Promise.all(result.map(async (utxoDto) => {
        const txHex = await bd_getTxHex(utxoDto.txid, network);
        return {
            txid: utxoDto.txid,
            vout: utxoDto.vout,
            amount: utxoDto.value, // Assuming the value is in BTC
            hex: txHex,
        };
    }));

    return utxos;
};

export const bd_getBalance = async (address: string, network: string): Promise<number> => {
    const utxos = await bd_getUtxos(address, network);
    const totalBalance = utxos.reduce((acc, utxo) => acc + utxo.amount, 0);
    return totalBalance;
};

export const bd_getTransactionStatus = async (txid: string, network: string): Promise<{ confirmations: number; fee: number; eta: string; }> => {
    const url = getRpcUrl(network);
    const response = await blockdaemonApi.post<JsonRpcResponse<VerboseTransaction>>(url, {
        jsonrpc: '2.0',
        id: 'blockdaemon-getrawtransaction-verbose',
        method: 'getrawtransaction',
        params: [txid, true] // Verbose = true
    });

    if (response.data.error) {
        throw new Error(response.data.error.message || 'Error fetching transaction from node.');
    }

    const txInfo = response.data.result;

    if (txInfo) {
        const feeInBtc = Math.abs(txInfo.fee || 0);
        const feeInSatoshis = Math.round(feeInBtc * 100000000);
        const confirmations = txInfo.confirmations ?? 0;
        const eta = confirmations > 0 ? 'Confirmed' : '~10 minutes';

        return {
            confirmations,
            fee: feeInSatoshis,
            eta,
        };
    }

    throw new Error('Transaction not found.');
};

export const bd_broadcastTransaction = async (txHex: string, network: string): Promise<string> => {
    const url = getRpcUrl(network);
    const response = await blockdaemonApi.post<JsonRpcResponse<string>>(url, {
        jsonrpc: '2.0',
        id: 'blockdaemon-sendrawtransaction',
        method: 'sendrawtransaction',
        params: [txHex]
    });

    if (response.data.error) {
        throw new Error(`Failed to broadcast transaction: ${response.data.error.message}`);
    }
    if (!response.data.result) {
        throw new Error('Broadcast failed: Node did not return a transaction hash.');
    }
    return response.data.result;
};
