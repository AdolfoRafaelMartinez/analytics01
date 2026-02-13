document.addEventListener('DOMContentLoaded', () => {
    const privateKeyInput = document.getElementById('privateKey');
    const fromAddressInput = document.getElementById('fromAddress');
    const networkSelect = document.getElementById('network');
    const serviceSelect = document.getElementById('service');
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

        const submitButton = transactionForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Broadcasting...';

        const toAddress = document.getElementById('toAddress').value;
        const amount = document.getElementById('amount').value;
        const fee = document.getElementById('fee').value;
        const privateKey = privateKeyInput.value;
        const networkName = networkSelect.value;
        const service = serviceSelect.value;

        try {
            const response = await fetch('/api/transfer-p2pkh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toAddress, amount, fee, privateKey, network_name: networkName, service })
            });

            // The backend now sends a redirect on both success and error.
            // The fetch API follows this redirect, and the final URL is in response.url.
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                // This is a fallback for unexpected server errors where no redirect is sent.
                const result = await response.json().catch(() => ({ error: 'An unknown server error occurred.' }));
                alert(`Error: ${result.error}`);
                submitButton.disabled = false;
                submitButton.textContent = 'Broadcast Transaction';
            }
        } catch (err) {
            alert('An unexpected network error occurred.');
            submitButton.disabled = false;
            submitButton.textContent = 'Broadcast Transaction';
        }
    });
});