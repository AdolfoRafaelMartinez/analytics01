document.addEventListener('DOMContentLoaded', () => {
    const mnemonicForm = document.getElementById('mnemonicForm');
    const generateMnemonicButton = document.getElementById('generateMnemonicButton');
    const mnemonicInput = document.getElementById('mnemonic');

    const resultDiv = document.getElementById('result');
    const seedSpan = document.getElementById('seed');
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

    if (mnemonicForm) {
        mnemonicForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent form from submitting the traditional way
            const mnemonic = mnemonicInput.value.trim();
            if (!mnemonic) {
                alert('Please enter or generate a mnemonic phrase.');
                return;
            }
            
            const network = document.getElementById('network').value;
            const path = document.getElementById('path').value;

            try {
                const response = await fetch('/mnemonic-to-private-key', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ mnemonic, network_name: network, path })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                seedSpan.textContent = data.seed;
                privateKeyWIFSpan.textContent = data.privateKey;
                privateKeyHexSpan.textContent = data.privateKeyHex;
                addressSpan.textContent = data.address;
                publicKeySpan.textContent = data.publicKey;

                if(resultDiv) resultDiv.style.display = 'block';
            } catch (error) {
                console.error('Error fetching address:', error);
                alert(`Failed to derive keys: ${error.message}`);
            }
        });
    }
});
