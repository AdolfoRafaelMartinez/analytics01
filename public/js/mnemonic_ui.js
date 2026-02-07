document.addEventListener('DOMContentLoaded', () => {
    // Get all the elements we'll need
    const mnemonicForm = document.getElementById('mnemonicForm');
    const generateMnemonicButton = document.getElementById('generateMnemonicButton');
    const mnemonicInput = document.getElementById('mnemonic');
    const networkSelect = document.getElementById('network');
    const pathInput = document.getElementById('path');

    const seedResultDiv = document.getElementById('seed-result');
    const resultDiv = document.getElementById('result');
    const seedSpan = document.getElementById('seed');
    
    // Master key elements
    const masterPrivateKeySpan = document.getElementById('masterPrivateKey');
    const masterPublicKeySpan = document.getElementById('masterPublicKey');
    const masterAddressSpan = document.getElementById('masterAddress');

    // Child key elements
    const childPrivateKeyHexSpan = document.getElementById('privateKeyHex');
    const childPrivateKeyWIFSpan = document.getElementById('privateKeyWIF');
    const childPublicKeySpan = document.getElementById('publicKey');
    const addressSpan = document.getElementById('address');
    
    let debounceTimer;

    const deriveAndDisplayKeys = async () => {
        const mnemonic = mnemonicInput.value.trim();

        if (!mnemonic) {
            if (seedResultDiv) seedResultDiv.style.display = 'none';
            if (resultDiv) resultDiv.style.display = 'none';
            return;
        }

        const network = networkSelect.value;
        const path = pathInput.value;

        try {
            const response = await fetch('/mnemonic-to-private-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mnemonic, network_name: network, path })
            });

            if (!response.ok) {
                 if (seedResultDiv) seedResultDiv.style.display = 'none';
                 if (resultDiv) resultDiv.style.display = 'none';
                 return;
            }

            const data = await response.json();

            // Populate the fields with the new data
            seedSpan.textContent = data.seed;
            masterPrivateKeySpan.textContent = data.masterPrivateKey;
            masterPublicKeySpan.textContent = data.masterPublicKey;
            masterAddressSpan.textContent = data.masterAddress;
            childPrivateKeyWIFSpan.textContent = data.privateKey;
            childPrivateKeyHexSpan.textContent = data.privateKeyHex;
            addressSpan.textContent = data.address;
            childPublicKeySpan.textContent = data.publicKey;

            if (seedResultDiv) seedResultDiv.style.display = 'block';
            if (resultDiv) resultDiv.style.display = 'block';

        } catch (error) {
            console.error('Error fetching address:', error);
            if (seedResultDiv) seedResultDiv.style.display = 'none';
            if (resultDiv) resultDiv.style.display = 'none';
        }
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
                await deriveAndDisplayKeys(); 
            } catch (error) {
                console.error('Error generating mnemonic:', error);
                alert('Failed to generate new mnemonic.');
            }
        });
    }

    // Attach listeners for automatic updates
    mnemonicInput.addEventListener('input', debouncedDerive);
    pathInput.addEventListener('input', debouncedDerive);
    networkSelect.addEventListener('change', deriveAndDisplayKeys);
    
    // Automatically derive keys on page load
    deriveAndDisplayKeys();
});
