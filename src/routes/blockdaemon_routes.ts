import { Router } from 'express';
import * as blockdaemonController from '../controllers/blockdaemon_controller.js';

const router = Router();

router.get('/height', blockdaemonController.bd_getBlockchainHeight);

export default router;
