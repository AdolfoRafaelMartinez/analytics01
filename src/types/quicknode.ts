export interface RpcResponse<T> {
    id: number;
    jsonrpc: string;
    result: T;
    error?: any;
}

export interface Utxo {
    amount: number;
    txid: string;
    vout: number;
    hex: string;
}

export interface VerboseTxData {
    hex: string;
    txid: string;
    hash: string;
    size: number;
    vsize: number;
    version: number;
    locktime: number;
    vin: any[]; // Define more specific types if needed
    vout: any[]; // Define more specific types if needed
    blockhash: string;
    confirmations: number;
    time: number;
    blocktime: number;
    fee?: number;
}


export type SendRawTransactionResponse = RpcResponse<string>;
export type GetRawTransactionResponse = RpcResponse<string>;
export type GetRawTransactionVerboseResponse = RpcResponse<VerboseTxData>;
