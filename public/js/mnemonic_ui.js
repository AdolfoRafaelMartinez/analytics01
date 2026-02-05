document.addEventListener('DOMContentLoaded', () => {
    const generateMnemonicButton = document.getElementById('generateMnemonicButton');
    const useMnemonicButton = document.getElementById('useMnemonicButton');
    const mnemonicInput = document.getElementById('mnemonic-input');
    const mnemonicResultDiv = document.getElementById('mnemonicResult');
    const mnemonicSpan = document.getElementById('mnemonic');
    const resultDiv = document.getElementById('result');
    const privateKeyHexSpan = document.getElementById('privateKeyHex');
    const privateKeyWIFSpan = document.getElementById('privateKeyWIF');
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
            const body = mnemonic ? { mnemonic, path: "m/44'/1'/0'/0/0", coinType: '1' } : { path: "m/44'/1'/0'/0/0", coinType: '1' };
            const response = await fetch('/address/from-mnemonic', {
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
            
            // Since the response is the rendered HTML, we need to parse it and update the DOM.
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract the new values from the parsed HTML
            const newMnemonic = doc.getElementById('mnemonic')?.textContent;
            const newPrivateKeyHex = doc.getElementById('privateKeyHex')?.textContent;
            const newPrivateKeyWIF = doc.getElementById('privateKeyWIF')?.textContent;
            const newPublicKey = doc.getElementById('publicKey')?.textContent;
            const newAddress = doc.getElementById('address')?.textContent;

            // Update the current page with the new values
            if(newMnemonic) mnemonicSpan.textContent = newMnemonic;
            if(newPrivateKeyHex) privateKeyHexSpan.textContent = newPrivateKeyHex;
            if(newPrivateKeyWIF) privateKeyWIFSpan.textContent = newPrivateKeyWIF;
            if(newPublicKey) publicKeySpan.textContent = newPublicKey;
            if(newAddress) addressSpan.textContent = newAddress;
            
            mnemonicResultDiv.style.display = newMnemonic ? 'block' : 'none';
            resultDiv.style.display = newAddress ? 'block' : 'none';

        } catch (error) {
            alert(`Error: ${error.message}`);
            mnemonicResultDiv.style.display = 'none';
            resultDiv.style.display = 'none';
        }
    }
});