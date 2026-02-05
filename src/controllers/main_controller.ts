import { Request, Response } from 'express';
import * as bip39 from 'bip39';
import * as fs from 'fs';
import * as path from 'path';

export const getHomePage = (req: Request, res: Response) => {
    res.render('home');
};

export const getWalletPage = (req: Request, res: Response) => {
    const mnemonic = bip39.generateMnemonic();
    res.render('index', { mnemonic: mnemonic });
};

export const getPrivateKeyToAddressPage = (req: Request, res: Response) => {
    res.render('private-key-to-address');
};

export const getMnemonicToPrivateKeyPage = (req: Request, res: Response) => {
    res.render('mnemonic-to-private-key');
};

export const getCoinTypesPage = (req: Request, res: Response) => {
    const csvPath = path.join(__dirname, '..', 'public', 'coin_types.csv');
    fs.readFile(csvPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading CSV file:", err);
            return res.status(500).send("Error reading coin types data.");
        }
        const lines = data.trim().split(/\r?\n/);
        lines.shift(); // remove header
        const cointypes = lines.map(line => {
            const values = line.split(',');
            return {
                bip44_index: values[0],
                symbol: values[2],
                coin: values[3]
            };
        });
        res.render('cointypes', { cointypes });
    });
};

export const getTransferPage = (req: Request, res: Response) => {
    res.render('transfer');
};
