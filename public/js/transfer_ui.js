document.addEventListener('DOMContentLoaded', () => {
    const sendTransactionButton = document.getElementById('sendTransactionButton');
    const fromAddressInput = document.getElementById('fromAddress');
    const toAddressInput = document.getElementById('toAddress');
    const amountInput = document.getElementById('amount');
    const privateKeyInput = document.getElementById('privateKey');
    const transactionResultDiv = document.getElementById('transactionResult');
    const transactionHashSpan = document.getElementById('transactionHash');

    sendTransactionButton.addEventListener('click', async () => {
        const fromAddress = fromAddressInput.value.trim();
        const toAddress = toAddressInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());
        const privateKey = privateKeyInput.value.trim();

        if (!fromAddress || !toAddress || !amount || !privateKey) {
            alert('Please fill out all fields.');
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
                    privateKey
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An unknown error occurred');
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
