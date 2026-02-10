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

    // New children elements
    const derivationPathDisplay_1 = document.getElementById('derivationPathDisplay_1');
    const childPrivateKeyWIFSpan_1 = document.getElementById('privateKeyWIF_1');
    const childPrivateKeyHexSpan_1 = document.getElementById('privateKeyHex_1');
    const childPublicKeySpan_1 = document.getElementById('publicKey_1');
    const addressLink_1 = document.getElementById('address_1');

    const derivationPathDisplay_2 = document.getElementById('derivationPathDisplay_2');
    const childPrivateKeyWIFSpan_2 = document.getElementById('privateKeyWIF_2');
    const childPrivateKeyHexSpan_2 = document.getElementById('privateKeyHex_2');
    const childPublicKeySpan_2 = document.getElementById('publicKey_2');
    const addressLink_2 = document.getElementById('address_2');

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

    function incrementPath(path, increment) {
        const parts = path.split('/');
        const lastPart = parseInt(parts[parts.length - 1], 10);
        parts[parts.length - 1] = lastPart + increment;
        return parts.join('/');
    }

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
            const paths = [path, incrementPath(path, 1), incrementPath(path, 2)];
            const requests = paths.map(p => fetch('/mnemonic-to-private-key', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mnemonic, network_name: network, path: p })
            }));

            const responses = await Promise.all(requests);
            
            if (responses.some(res => !res.ok)) {
                setVisibility(false);
                return;
            }

            const data = await Promise.all(responses.map(res => res.json()));

            seedSpan.textContent = data[0].seed;

            derivationPathDisplay.textContent = paths[0];
            masterPrivateKeySpan.textContent = data[0].masterPrivateKey;
            masterPublicKeySpan.textContent = data[0].masterPublicKey;
            masterAddressLink.textContent = data[0].masterAddress;
            masterAddressLink.href = `${mempoolUrl}/${data[0].masterAddress}`;
            
            childPrivateKeyWIFSpan.textContent = data[0].privateKey;
            childPrivateKeyHexSpan.textContent = data[0].privateKeyHex;
            childPublicKeySpan.textContent = data[0].publicKey;
            addressLink.textContent = data[0].address;
            addressLink.href = `${mempoolUrl}/${data[0].address}`;

            derivationPathDisplay_1.textContent = paths[1];
            childPrivateKeyWIFSpan_1.textContent = data[1].privateKey;
            childPrivateKeyHexSpan_1.textContent = data[1].privateKeyHex;
            childPublicKeySpan_1.textContent = data[1].publicKey;
            addressLink_1.textContent = data[1].address;
            addressLink_1.href = `${mempoolUrl}/${data[1].address}`;

            derivationPathDisplay_2.textContent = paths[2];
            childPrivateKeyWIFSpan_2.textContent = data[2].privateKey;
            childPrivateKeyHexSpan_2.textContent = data[2].privateKeyHex;
            childPublicKeySpan_2.textContent = data[2].publicKey;
            addressLink_2.textContent = data[2].address;
            addressLink_2.href = `${mempoolUrl}/${data[2].address}`;

            nonHdPrivateKeyWIFSpan.textContent = data[0].nonHdPrivateKeyWIF;
            nonHdPrivateKeyHexSpan.textContent = data[0].nonHdPrivateKeyHex;
            nonHdPublicKeySpan.textContent = data[0].nonHdPublicKey;
            nonHdAddressLink.textContent = data[0].nonHdAddress;
            nonHdAddressLink.href = `${mempoolUrl}/${data[0].nonHdAddress}`;

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