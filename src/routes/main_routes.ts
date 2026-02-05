import { Router } from 'express';
import { getHomePage, getMnemonicToPrivateKeyPage, getPrivateKeyToAddressPage } from '../controllers/main_controller';
import { getAddressFromMnemonic, getAddressFromPrivateKey, createWallet, postPrivateKeyToAddressPage } from '../controllers/address_controller';

const router = Router();

// Page-serving routes
router.get('/', getHomePage);
router.get('/mnemonic-to-private-key', getMnemonicToPrivateKeyPage);
router.get('/private-key-to-address', getPrivateKeyToAddressPage);

// Form-handling and API routes
router.post('/private-key-to-address', postPrivateKeyToAddressPage);
router.post('/mnemonic-to-private-key', getAddressFromMnemonic);
router.post('/api/create-wallet', createWallet);

export default router;
