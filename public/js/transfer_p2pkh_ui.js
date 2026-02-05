document.addEventListener('DOMContentLoaded', () => {
    const privateKeyInput = document.getElementById('privateKey');
    const fromAddressInput = document.getElementById('fromAddress');
    const toAddressInput = document.getElementById('toAddress');
    const amountInput = document.getElementById('amount');
    const sendTransactionButton = document.getElementById('sendTransactionButton');
    const transactionResultDiv = document.getElementById('transactionResult');
    const transactionHashSpan = document.getElementById('transactionHash');

    // Derive the fromAddress whenever the private key changes
    privateKeyInput.addEventListener('input', async () => {
        const privateKey = privateKeyInput.value;
        if (privateKey.length > 0) {
            try {
                const response = await fetch('/api/get-address-from-private-key', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ privateKey, network_name: 'testnet' })
                });
                const data = await response.json();
                if (data.address) {
                    fromAddressInput.value = data.address;
                } else {
                    fromAddressInput.value = 'Invalid private key';
                }
            } catch (error) {
                fromAddressInput.value = 'Error deriving address';
            }
        }
    });

    // Handle the send transaction button click
    sendTransactionButton.addEventListener('click', async () => {
        const privateKey = privateKeyInput.value;
        const fromAddress = fromAddressInput.value;
        const toAddress = toAddressInput.value;
        const amount = amountInput.value;

        try {
            const response = await fetch('/transfer-btc-p2pkh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ privateKey, fromAddress, toAddress, amount })
            });

            const data = await response.json();

            if (response.ok) {
                transactionHashSpan.textContent = data.txHash;
                transactionResultDiv.style.display = 'block';
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            alert('An unexpected error occurred.');
        }
    });
});