document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const resultDetails = document.getElementById('result-details');
    const qrCodeImg = document.getElementById('qr-code');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        loading.style.display = 'block';
        result.style.display = 'none';

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
            const response = await fetch('https://backend-teste-ebiv.onrender.com/api/participants', { // Ajuste a URL se necessário
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
            resultDetails.textContent = `ID: ${resultData.participant.id}\nNome: ${resultData.participant.name}\nData de Nascimento: ${resultData.participant.birthDate}\nIdade: ${resultData.participant.age}\nCPF: ${resultData.participant.cpf}\nIgreja: ${resultData.participant.church}\nDistrito: ${resultData.participant.district}\nWhatsApp: ${resultData.participant.whatsapp}`;
            qrCodeImg.src = resultData.qrCode;

            result.style.display = 'block';
        } catch (error) {
            console.error('Erro:', error);
            resultDetails.textContent = 'Erro ao realizar o cadastro.';
            result.style.display = 'block';
        } finally {
            loading.style.display = 'none';
        }
    });
});
