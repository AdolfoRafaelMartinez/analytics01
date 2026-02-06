document.addEventListener('DOMContentLoaded', () => {
    const privateKeyInput = document.getElementById('privateKey');
    const fromAddressInput = document.getElementById('fromAddress');
    const toAddressInput = document.getElementById('toAddress');
    const amountInput = document.getElementById('amount');
    const transactionForm = document.getElementById('transactionForm');
    const transactionResult = document.getElementById('transactionResult');
    const transactionLink = document.getElementById('transactionLink');
    const networkSelect = document.getElementById('network');

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

    privateKeyInput.addEventListener('blur', deriveAddress);
    networkSelect.addEventListener('change', deriveAddress);

    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const privateKey = privateKeyInput.value.trim();
        const fromAddress = fromAddressInput.value.trim();
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
                    fromAddress: fromAddress,
                    toAddress: toAddress,
                    amount: parseFloat(amount),
                    network_name: network
                })
            });

            const data = await response.json();

            if (response.ok) {
                const txid = data.txid;
                let explorerUrl;

                switch (network) {
                    case 'mainnet':
                        explorerUrl = `https://mempool.space/tx/${txid}`;
                        break;
                    case 'testnet4':
                        explorerUrl = `https://mempool.space/testnet4/tx/${txid}`;
                        break;
                    default:
                        // Default to the standard testnet for testnet, testnet2, testnet3
                        explorerUrl = `https://mempool.space/testnet/tx/${txid}`;
                }
                
                transactionLink.href = explorerUrl;
                transactionLink.textContent = txid;
                transactionResult.style.display = 'block';
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            alert('An unexpected error occurred.');
        }
    });
});
