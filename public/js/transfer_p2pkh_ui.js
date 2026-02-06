document.addEventListener('DOMContentLoaded', () => {
    const privateKeyInput = document.getElementById('privateKey');
    const fromAddressInput = document.getElementById('fromAddress');
    const toAddressInput = document.getElementById('toAddress');
    const amountInput = document.getElementById('amount');
    const transactionForm = document.getElementById('transactionForm');
    const transactionResult = document.getElementById('transactionResult');
    const transactionId = document.getElementById('transactionId');
    const networkSelect = document.getElementById('network');

    // Function to derive address from private key
    const deriveAddress = async () => {
        const privateKey = privateKeyInput.value.trim();
        const network = networkSelect.value;

        if (!privateKey) {
            fromAddressInput.value = '';
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
                    network_name: network
                })
            });

            const data = await response.json();

            if (response.ok) {
                fromAddressInput.value = data.address;
            } else {
                fromAddressInput.value = data.error || 'Error deriving address';
            }
        } catch (error) {
            fromAddressInput.value = 'Error deriving address';
        }
    };

    // Event listener for private key input
    privateKeyInput.addEventListener('blur', deriveAddress);
    networkSelect.addEventListener('change', deriveAddress);

    // Event listener for form submission
    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const privateKey = privateKeyInput.value.trim();
        const fromAddress = fromAddressInput.value.trim(); // Read the fromAddress
        const toAddress = toAddressInput.value.trim();
        const amount = amountInput.value.trim();
        const network = networkSelect.value;

        try {
            const response = await fetch('/api/transfer-p2pkh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    privateKey: privateKey,
                    fromAddress: fromAddress, // Add fromAddress to the request body
                    toAddress: toAddress,
                    amount: parseFloat(amount),
                    network_name: network
                })
            });

            const data = await response.json();

            if (response.ok) {
                transactionId.textContent = data.txid;
                transactionResult.style.display = 'block';
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            alert('An unexpected error occurred.');
        }
    });
});
