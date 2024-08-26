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
            const response = await fetch('https://backend-teste-ebiv.onrender.com/api/participants', {
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
            document.getElementById('result-details').textContent = JSON.stringify(result.participant, null, 2);
            document.getElementById('qr-code').src = result.qrCode;

            // Salvar dados no localStorage
            localStorage.setItem('participantData', JSON.stringify(result.participant));

            // Redirecionar para a página de informações com ID do participante
            window.location.href = `confirmation.html?id=${result.participant.id}`;
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('result-details').textContent = 'Erro ao realizar o cadastro.';
        }
    });
});
