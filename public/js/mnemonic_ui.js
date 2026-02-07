document.addEventListener('DOMContentLoaded', () => {
    const mnemonicInput = document.getElementById('mnemonic');
    const networkSelect = document.getElementById('network');
    const pathInput = document.getElementById('path');
    const generateMnemonicButton = document.getElementById('generateMnemonicButton');

    const seedResultDiv = document.getElementById('seed-result');
    const hdResultDiv = document.getElementById('hd-result');
    const nonHdResultDiv = document.getElementById('non-hd-result');

    const seedSpan = document.getElementById('seed');
    const derivationPathDisplay = document.getElementById('derivationPathDisplay');

    // HD Wallet Elements
    const masterPrivateKeySpan = document.getElementById('masterPrivateKey');
    const masterPublicKeySpan = document.getElementById('masterPublicKey');
    const masterAddressLink = document.getElementById('masterAddress');
    const childPrivateKeyWIFSpan = document.getElementById('privateKeyWIF');
    const childPrivateKeyHexSpan = document.getElementById('privateKeyHex');
    const childPublicKeySpan = document.getElementById('publicKey');
    const addressLink = document.getElementById('address');

    // Non-HD Wallet Elements
    const nonHdPrivateKeyWIFSpan = document.getElementById('nonHdPrivateKeyWIF');
    const nonHdPrivateKeyHexSpan = document.getElementById('nonHdPrivateKeyHex');
    const nonHdPublicKeySpan = document.getElementById('nonHdPublicKey');
    const nonHdAddressLink = document.getElementById('nonHdAddress');

    let debounceTimer;

    const setVisibility = (visible) => {
        const display = visible ? 'block' : 'none';
        if (seedResultDiv) seedResultDiv.style.display = display;
        if (hdResultDiv) hdResultDiv.style.display = display;
        if (nonHdResultDiv) nonHdResultDiv.style.display = display;
    };

    const deriveAndDisplayKeys = async () => {
        const mnemonic = mnemonicInput.value.trim();
        if (!mnemonic) {
            setVisibility(false);
            return;
        }

        const path = pathInput.value.trim();
        const network = networkSelect.value;

        let mempoolUrl;
        if (network === 'mainnet') {
            mempoolUrl = 'https://mempool.space/address';
        } else if (network === 'testnet4') {
            mempoolUrl = 'https://mempool.space/testnet4/address';
        } else {
            mempoolUrl = 'https://mempool.space/testnet/address';
        }

        try {
            const response = await fetch('/mnemonic-to-private-key', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mnemonic, network_name: network, path })
            });

            if (!response.ok) {
                setVisibility(false);
                return;
            }

            const data = await response.json();

            seedSpan.textContent = data.seed;

            derivationPathDisplay.textContent = path;
            masterPrivateKeySpan.textContent = data.masterPrivateKey;
            masterPublicKeySpan.textContent = data.masterPublicKey;
            masterAddressLink.textContent = data.masterAddress;
            masterAddressLink.href = `${mempoolUrl}/${data.masterAddress}`;
            
            childPrivateKeyWIFSpan.textContent = data.privateKey;
            childPrivateKeyHexSpan.textContent = data.privateKeyHex;
            childPublicKeySpan.textContent = data.publicKey;
            addressLink.textContent = data.address;
            addressLink.href = `${mempoolUrl}/${data.address}`;

            nonHdPrivateKeyWIFSpan.textContent = data.nonHdPrivateKeyWIF;
            nonHdPrivateKeyHexSpan.textContent = data.nonHdPrivateKeyHex;
            nonHdPublicKeySpan.textContent = data.nonHdPublicKey;
            nonHdAddressLink.textContent = data.nonHdAddress;
            nonHdAddressLink.href = `${mempoolUrl}/${data.nonHdAddress}`;

            setVisibility(true);

        } catch (error) {
            console.error('Error fetching key data:', error);
            setVisibility(false);
        }
    };
    
    const handleNetworkChange = () => {
        const network = networkSelect.value;
        if (network === 'mainnet') {
            pathInput.value = "m/44'/0'/0'/0/0";
        } else { // for testnet and testnet4
            pathInput.value = "m/44'/1'/0'/0/0";
        }
        deriveAndDisplayKeys();
    };

    const debouncedDerive = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(deriveAndDisplayKeys, 300);
    };

    if (generateMnemonicButton) {
        generateMnemonicButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/create-wallet', { method: 'POST' });
                const data = await response.json();
                mnemonicInput.value = data.mnemonic;
                await handleNetworkChange();
            } catch (error) {
                console.error('Error generating mnemonic:', error);
                alert('Failed to generate new mnemonic.');
            }
        });
    }

    mnemonicInput.addEventListener('input', debouncedDerive);
    pathInput.addEventListener('input', debouncedDerive);
    networkSelect.addEventListener('change', handleNetworkChange);

    deriveAndDisplayKeys();
});