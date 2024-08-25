document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            birthDate: formData.get('birthDate'),
            cpf: formData.get('cpf'),
            church: formData.get('church'),
            district: formData.get('district'),
            whatsapp: formData.get('whatsapp'),
            acceptTerms: formData.get('acceptTerms') === 'on'
        };

        try {
            const response = await fetch('https://66cb587b4600d735f4d95012--sparkling-snickerdoodle-106ed1.netlify.app/.netlify/functions/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            document.getElementById('result-details').textContent = JSON.stringify(result.user, null, 2);
            document.getElementById('qr-code').src = result.qrCode;
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('result-details').textContent = 'Erro ao realizar o cadastro.';
        }
    });
});
