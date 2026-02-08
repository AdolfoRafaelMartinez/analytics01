document.addEventListener('DOMContentLoaded', () => {
    const privateKeyInput = document.getElementById('privateKey');
    const fromAddressInput = document.getElementById('fromAddress');
    const networkSelect = document.getElementById('network');
    const transactionForm = document.getElementById('transactionForm');
    const transactionResult = document.getElementById('transactionResult');
    const transactionLink = document.getElementById('transactionLink');

    const deriveAddress = async () => {
        const privateKey = privateKeyInput.value.trim();
        const networkName = networkSelect.value;
        if (privateKey.length === 64 && /^[0-9a-fA-F]+$/.test(privateKey)) {
            try {
                const response = await fetch('/api/get-address-from-private-key', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ privateKey: privateKey, network_name: networkName })
                });
                const data = await response.json();
                if (response.ok) {
                    fromAddressInput.value = data.address;
                } else {
                    fromAddressInput.value = 'Error: ' + data.error;
                }
            } catch (error) {
                fromAddressInput.value = 'Error deriving address.';
            }
        }
    };

    privateKeyInput.addEventListener('input', deriveAddress);
    networkSelect.addEventListener('change', deriveAddress);

    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const toAddress = document.getElementById('toAddress').value;
        const amount = document.getElementById('amount').value;
        const fee = document.getElementById('fee').value;
        const privateKey = privateKeyInput.value;
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
                    : `https://mempool.space/testnet/tx/${result.txid}`;
                
                transactionLink.href = explorerUrl;
                transactionLink.textContent = result.txid;
                transactionResult.style.display = 'block';
                 document.getElementById('transactionId').value = result.txid;
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (err) { 
            alert('An unexpected error occurred.');
        }
    });
});