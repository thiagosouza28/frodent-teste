document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const participantId = urlParams.get('id');

    const displayData = (data) => {
        const infoContainer = document.getElementById('cadastro-info');
        infoContainer.innerHTML = `
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Nome:</strong> ${data.name}</p>
            <p><strong>Data de Nascimento:</strong> ${data.birthDate}</p>
            <p><strong>Idade:</strong> ${data.age}</p>
            <p><strong>CPF:</strong> ${data.cpf}</p>
            <p><strong>Igreja:</strong> ${data.church}</p>
            <p><strong>Distrito:</strong> ${data.district}</p>
            <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
        `;
        document.getElementById('qr-code').src = data.qrCode;
        document.getElementById('qr-code-container').style.display = 'block';
        document.getElementById('save-button').style.display = 'block';
    };

    if (participantId) {
        try {
            const response = await fetch(`https://backend-teste-ebiv.onrender.com/api/participants/${participantId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const participant = await response.json();
            // Request QR Code URL separately
            const qrCodeResponse = await fetch(`https://backend-teste-ebiv.onrender.com/api/participants/${participantId}/qrcode`);
            if (!qrCodeResponse.ok) {
                throw new Error(`HTTP error! status: ${qrCodeResponse.status}`);
            }
            const qrCodeData = await qrCodeResponse.json();
            participant.qrCode = qrCodeData.qrCode;
            displayData(participant);
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('cadastro-info').textContent = 'Erro ao carregar informações do participante.';
        }
    } else {
        const storedData = localStorage.getItem('participantData');
        if (storedData) {
            const participant = JSON.parse(storedData);
            displayData(participant);
        } else {
            document.getElementById('cadastro-info').textContent = 'Dados do participante não encontrados.';
        }
    }
});
