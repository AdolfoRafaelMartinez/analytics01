document.addEventListener('DOMContentLoaded', () => {
    const generateMnemonicButton = document.getElementById('generateMnemonicButton');
    const useMnemonicButton = document.getElementById('useMnemonicButton');
    const mnemonicInput = document.getElementById('mnemonic-input');
    const mnemonicResultDiv = document.getElementById('mnemonicResult');
    const mnemonicSpan = document.getElementById('mnemonic');
    const resultDiv = document.getElementById('result');
    const privateKeySpan = document.getElementById('privateKey');
    const publicKeySpan = document.getElementById('publicKey');
    const addressSpan = document.getElementById('address');

    generateMnemonicButton.addEventListener('click', async () => {
        fetchAddress(null);
    });

    useMnemonicButton.addEventListener('click', async () => {
        const mnemonic = mnemonicInput.value.trim();
        if (!mnemonic) {
            alert('Please enter a mnemonic phrase.');
            return;
        }
        fetchAddress(mnemonic);
    });

    async function fetchAddress(mnemonic) {
        try {
            const body = mnemonic ? { mnemonic, network_name: 'testnet4' } : { network_name: 'testnet4' };
            const response = await fetch('/api/get-address-from-mnemonic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An unknown error occurred');
            }

            const data = await response.json();
            mnemonicSpan.textContent = data.mnemonic;
            privateKeySpan.textContent = data.privateKey;
            publicKeySpan.textContent = data.publicKey;
            addressSpan.textContent = data.address;
            mnemonicResultDiv.style.display = 'block';
            resultDiv.style.display = 'block';

        } catch (error) {
            alert(`Error: ${error.message}`);
            mnemonicResultDiv.style.display = 'none';
            resultDiv.style.display = 'none';
        }
    }
});