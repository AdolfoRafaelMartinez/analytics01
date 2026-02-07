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
    const masterAddressSpan = document.getElementById('masterAddress');
    const childPrivateKeyWIFSpan = document.getElementById('privateKeyWIF');
    const childPrivateKeyHexSpan = document.getElementById('privateKeyHex');
    const childPublicKeySpan = document.getElementById('publicKey');
    const addressSpan = document.getElementById('address');

    // Non-HD Wallet Elements
    const nonHdPrivateKeyWIFSpan = document.getElementById('nonHdPrivateKeyWIF');
    const nonHdPrivateKeyHexSpan = document.getElementById('nonHdPrivateKeyHex');
    const nonHdPublicKeySpan = document.getElementById('nonHdPublicKey');
    const nonHdAddressSpan = document.getElementById('nonHdAddress');

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

        // --- Sync network dropdown from path input ---
        const path = pathInput.value.trim();
        const pathParts = path.split('/');
        if (pathParts.length > 2) {
            const coinType = pathParts[2];
            if (coinType === "0'" && networkSelect.value !== 'mainnet') {
                networkSelect.value = 'mainnet';
            } else if (coinType === "1'" && networkSelect.value !== 'testnet') {
                networkSelect.value = 'testnet';
            }
        }
        
        const network = networkSelect.value;

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

            // Populate Seed
            seedSpan.textContent = data.seed;

            // Populate HD Wallet
            derivationPathDisplay.textContent = path;
            masterPrivateKeySpan.textContent = data.masterPrivateKey;
            masterPublicKeySpan.textContent = data.masterPublicKey;
            masterAddressSpan.textContent = data.masterAddress;
            childPrivateKeyWIFSpan.textContent = data.privateKey;
            childPrivateKeyHexSpan.textContent = data.privateKeyHex;
            childPublicKeySpan.textContent = data.publicKey;
            addressSpan.textContent = data.address;

            // Populate Non-HD Wallet
            nonHdPrivateKeyWIFSpan.textContent = data.nonHdPrivateKeyWIF;
            nonHdPrivateKeyHexSpan.textContent = data.nonHdPrivateKeyHex;
            nonHdPublicKeySpan.textContent = data.nonHdPublicKey;
            nonHdAddressSpan.textContent = data.nonHdAddress;

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
        } else { // testnet
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
                await handleNetworkChange(); // Use handleNetworkChange to set default path and derive
            } catch (error) {
                console.error('Error generating mnemonic:', error);
                alert('Failed to generate new mnemonic.');
            }
        });
    }

    // Attach listeners for automatic updates
    mnemonicInput.addEventListener('input', debouncedDerive);
    pathInput.addEventListener('input', debouncedDerive);
    networkSelect.addEventListener('change', handleNetworkChange);

    // Automatically derive keys on page load
    deriveAndDisplayKeys();
});
