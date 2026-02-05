import { Router } from 'express';
import { getCoinTypesPage, getHomePage, getMnemonicToPrivateKeyPage, getPrivateKeyToAddressPage, getTransferPage } from '../controllers/main_controller';
import { createWallet, getAddressFromMnemonic, postPrivateKeyToAddressPage } from '../controllers/address_controller';

const router = Router();

router.get('/', getHomePage);

router.get('/cointypes', getCoinTypesPage);

router.get('/mnemonic-to-private-key', getMnemonicToPrivateKeyPage);

router.get('/private-key-to-address', getPrivateKeyToAddressPage);

router.get('/transfer', getTransferPage);

router.post('/mnemonic-to-private-key', getAddressFromMnemonic);

router.post('/api/create-wallet', createWallet);

router.post('/private-key-to-address', postPrivateKeyToAddressPage);

export default router;
