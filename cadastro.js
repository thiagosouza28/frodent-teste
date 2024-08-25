document.addEventListener('DOMContentLoaded', () => {
    const cadastroInfo = document.getElementById('cadastro-info');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const qrCodeImg = document.getElementById('qr-code');
    const saveButton = document.getElementById('save-button');

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        cadastroInfo.innerHTML = 'ID do participante não fornecido.';
        return;
    }

    async function loadParticipantInfo() {
        try {
            const response = await fetch(`https://backend-teste-ebiv.onrender.com/api/register/${id}`);
            if (!response.ok) {
                throw new Error('Erro ao carregar informações do participante.');
            }

            const participant = await response.json();
            displayParticipantInfo(participant);
        } catch (error) {
            console.error('Erro:', error);
            cadastroInfo.innerHTML = 'Erro ao carregar informações.';
        }
    }

    function displayParticipantInfo(participant) {
        cadastroInfo.innerHTML = `
            <h2>Informações do Participante</h2>
            <p><strong>Nome:</strong> ${participant.name}</p>
            <p><strong>Data de Nascimento:</strong> ${participant.birthDate}</p>
            <p><strong>Idade:</strong> ${participant.age}</p>
            <p><strong>CPF:</strong> ${participant.cpf}</p>
            <p><strong>Igreja:</strong> ${participant.church}</p>
            <p><strong>Distrito:</strong> ${participant.district}</p>
            <p><strong>WhatsApp:</strong> ${participant.whatsapp}</p>
        `;

        // Gerar e exibir QR Code
        qrCodeImg.src = `https://backend-teste-ebiv.onrender.com/api/register/${id}/qrcode`;
        qrCodeContainer.style.display = 'block';
        saveButton.style.display = 'block';
    }

    saveButton.addEventListener('click', () => {
        html2canvas(cadastroInfo).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF.jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save('participante.pdf');
        }).catch(error => console.error('Erro ao gerar PDF:', error));
    });

    loadParticipantInfo();
});
