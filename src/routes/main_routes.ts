import { Router } from 'express';
import {
    getHomePage,
    getWalletPage,
    getPrivateKeyToAddressPage,
    getMnemonicToPrivateKeyPage,
    getCoinTypesPage,
    getTransferPage
} from '../controllers/main_controller';
import {
    getAddressFromPrivateKey,
    getAddressFromMnemonic,
    createWallet
} from '../controllers/address_controller';
import { transferBtc } from '../controllers/transfer_controller';

const router = Router();

// Page rendering routes
router.get('/', getHomePage);
router.get('/wallet', getWalletPage);
router.get('/private-key-to-address', getPrivateKeyToAddressPage);
router.get('/mnemonic-to-private-key', getMnemonicToPrivateKeyPage);
router.get('/cointypes', getCoinTypesPage);
router.get('/transfer', getTransferPage);

// API routes
router.post('/api/wallet', createWallet);
router.post('/api/get-address-from-mnemonic', getAddressFromMnemonic);
router.post('/transfer-btc', transferBtc);

export default router;
