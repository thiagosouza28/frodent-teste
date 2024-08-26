document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loading');
    const cadastrosList = document.getElementById('cadastros-list');
    const cadastrosTableBody = document.querySelector('#cadastros-table tbody');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const closeModal = document.querySelector('#edit-modal .close');
    
    async function fetchParticipants() {
        try {
            const response = await fetch('https://backend-teste-ebiv.onrender.com/api/participants'); // Ajuste a URL se necessário
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const participants = await response.json();
            console.log('Participants fetched:', participants); // Debugging log
            populateTable(participants);
        } catch (error) {
            console.error('Erro ao carregar participantes:', error);
        } finally {
            loading.style.display = 'none';
            cadastrosList.style.display = 'block';
        }
    }

    function populateTable(participants) {
        cadastrosTableBody.innerHTML = '';
        participants.forEach(participant => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${participant.id}</td>
                <td>${participant.name}</td>
                <td>${participant.birthDate}</td>
                <td>${participant.age}</td>
                <td>${participant.cpf}</td>
                <td>${participant.church}</td>
                <td>${participant.district}</td>
                <td>${participant.whatsapp}</td>
                <td>
                    <button class="edit-button" data-id="${participant.id}">Editar</button>
                    <button class="delete-button" data-id="${participant.id}">Excluir</button>
                </td>
            `;
            cadastrosTableBody.appendChild(row);
        });
    }

    async function editParticipant(id, updatedData) {
        try {
            const response = await fetch(`https://backend-teste-ebiv.onrender.com/api/participants/${id}`, { // Ajuste a URL se necessário
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchParticipants();
            closeEditModal();
        } catch (error) {
            console.error('Erro ao atualizar participante:', error);
        }
    }

    async function deleteParticipant(id) {
        try {
            const response = await fetch(`https://backend-teste-ebiv.onrender.com/api/participants/${id}`, { // Ajuste a URL se necessário
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchParticipants();
        } catch (error) {
            console.error('Erro ao excluir participante:', error);
        }
    }

    function openEditModal(id) {
        const row = Array.from(cadastrosTableBody.querySelectorAll('tr')).find(row => row.querySelector('.edit-button').dataset.id === id);
        const cells = row.querySelectorAll('td');
        document.getElementById('edit-id').value = id;
        document.getElementById('edit-name').value = cells[1].textContent;
        document.getElementById('edit-birthDate').value = cells[2].textContent;
        document.getElementById('edit-cpf').value = cells[4].textContent;
        document.getElementById('edit-church').value = cells[5].textContent;
        document.getElementById('edit-district').value = cells[6].textContent;
        document.getElementById('edit-whatsapp').value = cells[7].textContent;
        editModal.style.display = 'block';
    }

    function closeEditModal() {
        editModal.style.display = 'none';
    }

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = document.getElementById('edit-id').value;
        const updatedData = {
            name: document.getElementById('edit-name').value,
            birthDate: document.getElementById('edit-birthDate').value,
            cpf: document.getElementById('edit-cpf').value,
            church: document.getElementById('edit-church').value,
            district: document.getElementById('edit-district').value,
            whatsapp: document.getElementById('edit-whatsapp').value
        };
        editParticipant(id, updatedData);
    });

    closeModal.addEventListener('click', closeEditModal);

    cadastrosTableBody.addEventListener('click', (event) => {
        const button = event.target;
        const id = button.dataset.id;
        if (button.classList.contains('edit-button')) {
            openEditModal(id);
        } else if (button.classList.contains('delete-button')) {
            if (confirm('Tem certeza que deseja excluir este participante?')) {
                deleteParticipant(id);
            }
        }
    });

    fetchParticipants();
});
