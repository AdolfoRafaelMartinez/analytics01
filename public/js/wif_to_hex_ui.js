document.addEventListener('DOMContentLoaded', () => {
    const wifInput = document.getElementById('wif-input');
    const convertButton = document.getElementById('convertWifButton');
    const resultDiv = document.getElementById('result');
    const privateKeyHexSpan = document.getElementById('privateKeyHex');

    if (convertButton) {
        convertButton.addEventListener('click', async () => {
            const wif = wifInput.value.trim();
            if (!wif) {
                alert('Please enter a WIF key.');
                return;
            }
            convertWif(wif);
        });
    }

    async function convertWif(wif) {
        try {
            const response = await fetch('/api/wif-to-hex', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ wif })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An unknown error occurred.');
            }

            privateKeyHexSpan.textContent = data.hex;
            if (resultDiv) resultDiv.style.display = 'block';

        } catch (error) {
            console.error('Error converting WIF:', error);
            alert(`Failed to convert WIF: ${error.message}`);
        }
    }
});
