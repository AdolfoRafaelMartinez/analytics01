document.addEventListener('DOMContentLoaded', () => {
    const deriveButton = document.getElementById('deriveButton');
    const privateKeyInput = document.getElementById('privateKey');
    const resultDiv = document.getElementById('result');
    const publicKeySpan = document.getElementById('publicKey');
    const addressSpan = document.getElementById('address');

    deriveButton.addEventListener('click', async () => {
        const privateKey = privateKeyInput.value;
        if (!privateKey) {
            alert('Please enter a private key.');
            return;
        }

        try {
            const response = await fetch('/api/get-address-from-private-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    privateKey: privateKey,
                    network_name: 'testnet4' // Always use testnet4 for this tool
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An unknown error occurred');
            }

            const data = await response.json();
            publicKeySpan.textContent = data.publicKey;
            addressSpan.textContent = data.address;
            resultDiv.style.display = 'block';

        } catch (error) {
            alert(`Error: ${error.message}`);
            resultDiv.style.display = 'none';
        }
    });
});
