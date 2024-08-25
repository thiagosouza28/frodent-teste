document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        document.getElementById('cadastro-info').innerHTML = '<p>ID do participante não encontrado.</p>';
        return;
    }

    try {
        const response = await fetch(`https://backend-teste-ebiv.onrender.com/api/register/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar informações do participante.');
        }

        const participant = await response.json();

        const infoDiv = document.getElementById('cadastro-info');
        infoDiv.innerHTML = `
            <p><strong>Nome:</strong> ${participant.name}</p>
            <p><strong>Data de Nascimento:</strong> ${participant.birthDate}</p>
            <p><strong>Idade:</strong> ${participant.age}</p>
            <p><strong>CPF:</strong> ${participant.cpf}</p>
            <p><strong>Igreja:</strong> ${participant.church}</p>
            <p><strong>Distrito:</strong> ${participant.district}</p>
            <p><strong>WhatsApp:</strong> ${participant.whatsapp}</p>
        `;
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('cadastro-info').innerHTML = '<p>Erro ao carregar informações do participante.</p>';
    }
});
