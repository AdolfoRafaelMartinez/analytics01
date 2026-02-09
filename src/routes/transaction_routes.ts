import { Router } from 'express';
import { getTransactionDetailsPage } from '../controllers/main_controller.js';

const router = Router();

router.get('/transaction', getTransactionDetailsPage);

export default router;
