export interface RpcResponse<T> {
    id: number;
    jsonrpc: string;
    result: T;
}

export interface Utxo {
    amount: number;
    txid: string;
    vout: number;
    hex: string;
}

export type SendRawTransactionResponse = RpcResponse<string>;
export type GetRawTransactionResponse = RpcResponse<string>;
