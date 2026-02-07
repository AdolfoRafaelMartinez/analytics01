import express from 'express';
import { getBalancePage, checkBalance } from '../controllers/balance_controller.js';

const router = express.Router();

router.get('/balance', getBalancePage);
router.post('/balance', checkBalance);

export default router;
