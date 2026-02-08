document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transactionForm');
    const transactionResult = document.getElementById('transactionResult');
    const transactionLink = document.getElementById('transactionLink');
    const networkSelect = document.getElementById('network');

    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const toAddress = document.getElementById('toAddress').value;
        const amount = document.getElementById('amount').value;
        const fee = document.getElementById('fee').value;
        const privateKey = document.getElementById('privateKey').value;
        const networkName = networkSelect.value;

        try {
            const response = await fetch('/api/transfer-p2pkh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toAddress, amount, fee, privateKey, network_name: networkName })
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
});
