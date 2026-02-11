document.addEventListener('DOMContentLoaded', function () {
    const checkBalanceBtn = document.getElementById('checkBalanceBtn');
    const btcAddressInput = document.getElementById('btcAddress');
    const balanceResultDiv = document.getElementById('balanceResult');
    const balanceSpan = document.getElementById('balance');
    const serviceSelect = document.getElementById('service');

    checkBalanceBtn.addEventListener('click', function () {
        const btcAddress = btcAddressInput.value.trim();
        const service = serviceSelect.value;

        if (btcAddress === '') {
            alert('Please enter a Bitcoin address.');
            return;
        }

        fetch('/api/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address: btcAddress, service: service }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            balanceSpan.textContent = data.balance;
            balanceResultDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Error checking balance:', error);
            alert('Error checking balance: ' + error.message);
        });
    });
});