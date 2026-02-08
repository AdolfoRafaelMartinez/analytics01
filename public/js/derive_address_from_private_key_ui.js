const axios = require('axios');
const bitcoin = require('bitcoinjs-lib');

document.addEventListener('DOMContentLoaded', () => {
    const privateKeyInput = document.getElementById('privateKey');
    const fromAddressInput = document.getElementById('fromAddress');
    const networkSelect = document.getElementById('network');

    const deriveAddress = async () => {
        const privateKeyHex = privateKeyInput.value.trim();
        const networkName = networkSelect.value;
        if (privateKeyHex.length === 64) {
            try {
                const network = networkName === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
                const keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKeyHex, 'hex'), { network });
                const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
                fromAddressInput.value = address;
            } catch (error) {
                fromAddressInput.value = 'Invalid private key';
            }
        } else {
            fromAddressInput.value = '';
        }
    };

    privateKeyInput.addEventListener('input', deriveAddress);
    networkSelect.addEventListener('change', deriveAddress);
});
