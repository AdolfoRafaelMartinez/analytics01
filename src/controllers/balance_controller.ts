import { Request, Response } from 'express';
import { getBalance as getQuickNodeBalance } from '../services/quicknode_service.js';

export const getBalancePage = (req: Request, res: Response) => {
    res.render('balance');
};

export const checkBalance = async (req: Request, res: Response) => {
    const { address, network } = req.body;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const balance = await getQuickNodeBalance(address, network);
        res.json({ balance });
    } catch (error) {
        const err = error as Error
        res.status(500).json({ error: err.message });
    }
};
