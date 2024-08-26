document.addEventListener('DOMContentLoaded', () => {
    const cadastrosTable = document.getElementById('cadastros-table').getElementsByTagName('tbody')[0];
    const loading = document.getElementById('loading');
    const cadastrosList = document.getElementById('cadastros-list');
    const editModal = document.getElementById('edit-modal');
    const closeModalButton = document.querySelector('.modal .close');
    const editForm = document.getElementById('edit-form');

    async function loadCadastros() {
        try {
            const response = await fetch('https://backend-teste-ebiv.onrender.com/api/users');
            if (!response.ok) {
                throw new Error('Erro ao carregar cadastros.');
            }

            const cadastros = await response.json();
            loading.style.display = 'none';
            cadastrosList.style.display = 'block';

            cadastrosTable.innerHTML = '';
            cadastros.forEach(participant => {
                const row = cadastrosTable.insertRow();
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
                        <button class="edit-btn" data-id="${participant.id}">Editar</button>
                        <button class="delete-btn" data-id="${participant.id}">Excluir</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error('Erro:', error);
            loading.innerHTML = 'Erro ao carregar cadastros.';
        }
    }

    loadCadastros();

    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const id = event.target.getAttribute('data-id');
            try {
                const response = await fetch(`https://backend-teste-ebiv.onrender.com/api/register/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao carregar dados do participante.');
                }

                const participant = await response.json();
                document.getElementById('edit-id').value = participant.id;
                document.getElementById('edit-name').value = participant.name;
                document.getElementById('edit-birthDate').value = participant.birthDate;
                document.getElementById('edit-cpf').value = participant.cpf;
                document.getElementById('edit-church').value = participant.church;
                document.getElementById('edit-district').value = participant.district;
                document.getElementById('edit-whatsapp').value = participant.whatsapp;
                
                editModal.style.display = 'block';
            } catch (error) {
                console.error('Erro:', error);
            }
        }

        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');
            if (confirm('Tem certeza de que deseja excluir este participante?')) {
                try {
                    const response = await fetch(`https://backend-teste-ebiv.onrender.com/api/register/${id}`, {
                        method: 'DELETE'
                    });
                    if (!response.ok) {
                        throw new Error('Erro ao excluir participante.');
                    }
                    loadCadastros();
                } catch (error) {
                    console.error('Erro:', error);
                }
            }
        }
    });

    closeModalButton.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`https://backend-teste-ebiv.onrender.com/api/register/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar participante.');
            }
            editModal.style.display = 'none';
            loadCadastros();
        } catch (error) {
            console.error('Erro:', error);
        }
    });
});
