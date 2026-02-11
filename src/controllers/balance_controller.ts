import { Request, Response } from 'express';
import { getBalance as getQuickNodeBalance } from '../services/quicknode_service.js';
import { getBalance as getAlchemyBalance } from '../services/alchemy_service.js';

export const getBalancePage = (req: Request, res: Response) => {
    res.render('balance');
};

export const checkBalance = async (req: Request, res: Response) => {
    const { address, network, service } = req.body;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        let balance;
        if (service === 'alchemy') {
            balance = await getAlchemyBalance(address, network);
        } else {
            balance = await getQuickNodeBalance(address, network);
        }
        res.json({ balance });
    } catch (error) {
        const err = error as Error
        res.status(500).json({ error: err.message });
    }
};
