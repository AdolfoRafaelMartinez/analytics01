import { Request, Response } from 'express';
import * as blockdaemonService from '../services/blockdaemon_service.js';

export const getBlockchainHeight = async (req: Request, res: Response) => {
    try {
        const network = req.query.network as string || 'mainnet'; // Default to mainnet
        const height = await blockdaemonService.getBlockchainHeight(network);
        res.render('blockdaemon-blockchain', { height, network, error: null });
    } catch (error) {        
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.render('blockdaemon-blockchain', { height: null, network: req.query.network, error: errorMessage });
    }
};
