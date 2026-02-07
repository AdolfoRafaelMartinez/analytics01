import { Request, Response } from 'express';

export const getHomePage = (req: Request, res: Response) => {
    res.render('index'); 
};

export const getMnemonicToPrivateKeyPage = (req: Request, res: Response) => {
    res.render('mnemonic-to-private-key');
};

export const getPrivateKeyToAddressPage = (req: Request, res: Response) => {
    res.render('private-key-to-address');
};

export const getWifToHexPage = (req: Request, res: Response) => {
    res.render('wif-to-hex');
};