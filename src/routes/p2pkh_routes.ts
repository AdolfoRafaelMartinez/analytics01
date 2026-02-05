import { Router } from 'express';
import { transferBtcP2pkh } from '../controllers/transfer_p2pkh_controller.js';
import { getAddressFromPrivateKey } from '../controllers/address_controller.js';

const router = Router();

// Page rendering route
router.get('/transfer-p2pkh', (req, res) => {
    res.render('transfer-p2pkh');
});

// API route for address derivation
router.post('/api/get-address-from-private-key', getAddressFromPrivateKey);

// API route for the transaction
router.post('/transfer-btc-p2pkh', transferBtcP2pkh);

export default router;
