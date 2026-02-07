document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('balance-form');
    const resultContainer = document.getElementById('result-container');
    const balanceResult = document.getElementById('balance-result');
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const address = document.getElementById('address').value;
        const network = document.getElementById('network').value;

        try {
            const response = await fetch('/balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ address, network })
            });

            if (response.ok) {
                const data = await response.json();
                balanceResult.textContent = `${data.balance} BTC`;
                resultContainer.style.display = 'block';
                errorContainer.style.display = 'none';
            } else {
                const errorData = await response.json();
                errorMessage.textContent = errorData.error;
                errorContainer.style.display = 'block';
                resultContainer.style.display = 'none';
            }
        } catch (error) {
            errorMessage.textContent = 'An unexpected error occurred.';
            errorContainer.style.display = 'block';
            resultContainer.style.display = 'none';
        }
    });
});
