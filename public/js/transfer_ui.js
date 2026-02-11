document.addEventListener('DOMContentLoaded', () => {
    const privateKeyInput = document.getElementById('privateKey');
    const fromAddressInput = document.getElementById('fromAddress');
    const toAddressInput = document.getElementById('toAddress');
    const amountInput = document.getElementById('amount');
    const serviceSelect = document.getElementById('service');
    const sendTransactionButton = document.getElementById('sendTransactionButton');
    const transactionResultDiv = document.getElementById('transactionResult');
    const transactionHashSpan = document.getElementById('transactionHash');

    // Debounce function to limit API calls while typing
    let debounceTimeout;
    const debounce = (func, delay) => {
        return function(...args) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const deriveAddress = async () => {
        const privateKey = privateKeyInput.value.trim();
        
        // A valid private key is 64 hex characters.
        if (privateKey.length !== 64 || !/^[0-9a-fA-F]+$/.test(privateKey)) {
            fromAddressInput.value = 'Invalid or incomplete private key';
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
                    network_name: 'testnet'
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to derive address.');
            }

            const data = await response.json();
            fromAddressInput.value = data.address;

        } catch (error) {
            console.error('Derivation Error:', error);
            fromAddressInput.value = `Error: ${error.message}`;
        }
    };

    // Add an input event listener to the private key field with debouncing
    privateKeyInput.addEventListener('input', debounce(deriveAddress, 300));

    sendTransactionButton.addEventListener('click', async () => {
        const fromAddress = fromAddressInput.value.trim();
        const toAddress = toAddressInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());
        const privateKey = privateKeyInput.value.trim();
        const service = serviceSelect.value;

        if (!fromAddress || fromAddress.startsWith('Error') || fromAddress.startsWith('Invalid') || !toAddress || isNaN(amount) || !privateKey) {
            alert('Please ensure you have a valid private key and and all other fields are correctly filled out.');
            return;
        }

        try {
            const response = await fetch('/transfer-btc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    fromAddress,
                    toAddress,
                    amount,
                    privateKey,
                    service
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Transaction failed.');
            }

            const data = await response.json();
            transactionHashSpan.textContent = data.txHash;
            transactionResultDiv.style.display = 'block';

        } catch (error) {
            alert(`Error: ${error.message}`);
            transactionResultDiv.style.display = 'none';
        }
    });
});
