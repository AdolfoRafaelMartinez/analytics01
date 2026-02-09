import { Request, Response } from 'express';
import fetch from 'node-fetch';

export const getHomePage = (req: Request, res: Response) => {
    res.render('index'); 
};

export const getMnemonicToPrivateKeyPage = (req: Request, res: Response) => {
    res.render('mnemonic-to-private-key');
};

export const getPrivateKeyToAddressPage = (req: Request, res: Response) => {
    res.render('private-key-to-address', { address: null, error: null });
};

export const getWifToHexPage = (req: Request, res: Response) => {
    res.render('wif-to-hex');
};

export const getConfirmationsPage = (req: Request, res: Response) => {
    res.render('confirmations', { transactionId: '', confirmations: null, fee: null, eta: null, error: null });
};

export const getTransactionDetailsPage = async (req: Request, res: Response) => {
    const { txid, network } = req.query;

    if (txid && network) {
        try {
            const networkPath = network === 'mainnet' ? '' : `${network}/`;
            const apiUrl = `https://mempool.space/${networkPath}api/tx/${txid}`;
            const apiResponse = await fetch(apiUrl);

            if (!apiResponse.ok) {
                const errorText = await apiResponse.text();
                throw new Error(errorText || 'Failed to fetch transaction details.');
            }

            const data = await apiResponse.json() as any;

            if (data.status.confirmed) {
                try {
                    const heightUrl = `https://mempool.space/${networkPath}api/blocks/tip/height`;
                    const heightResponse = await fetch(heightUrl);
                    if (heightResponse.ok) {
                        const currentHeight = await heightResponse.json() as number;
                        data.confirmations = currentHeight - data.status.block_height + 1;
                    } else {
                        data.confirmations = 'N/A';
                    }
                } catch (e) {
                    data.confirmations = 'N/A';
                }
            }

            res.render('transaction', { 
                txid,
                network,
                details: data,
                error: null 
            });
        } catch (error: any) {
            res.render('transaction', { 
                txid,
                network,
                details: null,
                error: error.message 
            });
        }
    } else {
        res.render('transaction', { 
            txid: '', 
            network: 'testnet4',
            details: null,
            error: null 
        });
    }
};