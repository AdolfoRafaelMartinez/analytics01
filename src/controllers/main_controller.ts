import { Request, Response } from 'express';

export const getHomePage = (req: Request, res: Response) => {
    res.render('home');
};

export const getWalletPage = (req: Request, res: Response) => {
    const data = {
        mnemonic: ''
    };
    res.render('index', data);
};

export const getWifToHexPage = (req: Request, res: Response) => {
    res.render('wif-to-hex');
};

export const getMnemonicToPrivateKeyPage = (req: Request, res: Response) => {
    res.render('mnemonic-to-private-key');
};

export const getPrivateKeyToAddressPage = (req: Request, res: Response) => {
    res.render('private-key-to-address', { address: null, error: null });
};
