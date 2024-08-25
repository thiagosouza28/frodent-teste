document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        loading.style.display = 'block';

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

            const resultData = await response.json();
            document.getElementById('result-details').textContent = JSON.stringify(resultData.participant, null, 2);
            document.getElementById('qr-code').src = resultData.qrCode;

            loading.style.display = 'none';
            result.style.display = 'block';

            // Redirecionar para a página de informações do participante
            window.location.href = `cadastro.html?id=${resultData.participant.id}`;
        } catch (error) {
            console.error('Erro:', error);
            loading.style.display = 'none';
            document.getElementById('result-details').textContent = 'Erro ao realizar o cadastro.';
        }
    });
});
