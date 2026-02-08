document.addEventListener('DOMContentLoaded', () => {
    const privateKeyInput = document.getElementById('privateKey');
    const networkSelect = document.getElementById('network');
    const transactionForm = document.getElementById('transactionForm');
    const transactionResult = document.getElementById('transactionResult');
    const transactionLink = document.getElementById('transactionLink');

    const detectNetwork = () => {
        const privateKey = privateKeyInput.value.trim();
        if (privateKey.startsWith('c')) {
            networkSelect.value = 'testnet4';
        } else if (privateKey.startsWith('5') || privateKey.startsWith('K') || privateKey.startsWith('L')) {
            networkSelect.value = 'mainnet';
        }
    };

    privateKeyInput.addEventListener('input', () => {
        detectNetwork();
    });

    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fromAddress = document.getElementById('fromAddress').value;
        const toAddress = document.getElementById('toAddress').value;
        const amount = document.getElementById('amount').value;
        const privateKey = privateKeyInput.value;
        const networkName = networkSelect.value;

        try {
            const response = await fetch('/api/transfer-p2pkh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fromAddress, toAddress, amount, privateKey, network_name: networkName })
            });

            const result = await response.json();

            if (response.ok) {
                const explorerUrl = networkName === 'mainnet' 
                    ? `https://mempool.space/tx/${result.txid}` 
                    : `https://mempool.space/testnet4/tx/${result.txid}`;
                
                transactionLink.href = explorerUrl;
                transactionLink.textContent = result.txid;
                transactionResult.style.display = 'block';
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (err) {
            alert('An unexpected error occurred.');
        }
    });

    // Initial detection on page load if private key is present
    if (privateKeyInput.value) {
        detectNetwork();
    }
});
