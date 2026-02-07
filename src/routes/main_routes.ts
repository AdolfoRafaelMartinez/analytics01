import { Router } from 'express';
import { getHomePage, getMnemonicToPrivateKeyPage, getPrivateKeyToAddressPage, getWifToHexPage } from '../controllers/main_controller.js';
import { getAddressFromMnemonic, postPrivateKeyToAddressPage, convertWifToHex } from '../controllers/address_controller.js';

const router = Router();

// Page-serving routes
router.get('/', getHomePage);
router.get('/mnemonic-to-private-key', getMnemonicToPrivateKeyPage);
router.get('/private-key-to-address', getPrivateKeyToAddressPage);
router.get('/wif-to-hex', getWifToHexPage);

// Form-handling and API routes
router.post('/private-key-to-address', postPrivateKeyToAddressPage);
router.post('/mnemonic-to-private-key', getAddressFromMnemonic);
router.post('/api/wif-to-hex', convertWifToHex);

export default router;
