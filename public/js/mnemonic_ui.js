document.addEventListener('DOMContentLoaded', () => {
    const networkSelect = document.getElementById('network-select');
    const coinTypeSelect = document.getElementById('coin-type-select');
    const mnemonicInput = document.getElementById('mnemonic-input');
    const generateMnemonicButton = document.getElementById('generateMnemonicButton');
    const useMnemonicButton = document.getElementById('useMnemonicButton');

    const resultDiv = document.getElementById('result');
    const privateKeyHexSpan = document.getElementById('privateKeyHex');
    const privateKeyWIFSpan = document.getElementById('privateKeyWIF');
    const publicKeySpan = document.getElementById('publicKey');
    const addressSpan = document.getElementById('address');

    if (generateMnemonicButton) {
        generateMnemonicButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/create-wallet', { method: 'POST' });
                const data = await response.json();
                mnemonicInput.value = data.mnemonic;
            } catch (error) {
                console.error('Error generating mnemonic:', error);
                alert('Failed to generate new mnemonic.');
            }
        });
    }

    if (useMnemonicButton) {
        useMnemonicButton.addEventListener('click', async () => {
            const mnemonic = mnemonicInput.value.trim();
            if (!mnemonic) {
                alert('Please enter a mnemonic phrase.');
                return;
            }
            fetchAddress(mnemonic);
        });
    }

    async function fetchAddress(mnemonic) {
        try {
            const network = networkSelect.value;
            const body = { mnemonic, network_name: network };
            const response = await fetch('/mnemonic-to-private-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            privateKeyWIFSpan.textContent = data.privateKey;
            privateKeyHexSpan.textContent = data.privateKeyHex;
            addressSpan.textContent = data.address;
            publicKeySpan.textContent = data.publicKey;

            if(resultDiv) resultDiv.style.display = 'block';
        } catch (error) {
            console.error('Error fetching address:', error);
            alert('Failed to derive address from mnemonic.');
        }
    }
});
