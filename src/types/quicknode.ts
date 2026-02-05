export interface QuickNodeResponse<T> {
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

export type ListUnspentResponse = QuickNodeResponse<Utxo[]>;
export type SendRawTransactionResponse = QuickNodeResponse<string>;
export type GetRawTransactionResponse = QuickNodeResponse<string>;
