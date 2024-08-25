document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const processingScreen = document.getElementById('processing');
    const successScreen = document.getElementById('success-screen');
    const resultScreen = document.getElementById('result');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        form.style.display = 'none';
        processingScreen.style.display = 'block';

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
            const response = await fetch('https://backend-teste-ebiv.onrender.com/api/register', {
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

            // Exibir tela de sucesso
            processingScreen.style.display = 'none';
            successScreen.style.display = 'block';
            document.getElementById('success-details').textContent = JSON.stringify(result.user, null, 2);
            document.getElementById('success-qr-code').src = result.qrCode;

        } catch (error) {
            console.error('Erro:', error);
            processingScreen.style.display = 'none';
            form.style.display = 'block';
            resultScreen.style.display = 'block';
            document.getElementById('result-details').textContent = 'Erro ao realizar o cadastro.';
        }
    });
});
