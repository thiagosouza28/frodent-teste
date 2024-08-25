document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            birthDate: document.getElementById('birthDate').value,
            cpf: document.getElementById('cpf').value,
            church: document.getElementById('church').value,
            district: document.getElementById('district').value,
            whatsapp: document.getElementById('whatsapp').value,
            acceptTerms: document.getElementById('acceptTerms').checked
        };

        fetch('https://backend-teste-wheat.vercel.app/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.qrCode) {
                document.getElementById('searchResults').innerHTML = `
                    <h3>Cadastro realizado com sucesso!</h3>
                    <p>ID: ${data.user.id}</p>
                    <p>Nome: ${data.user.name}</p>
                    <img src="${data.qrCode}" alt="QR Code">
                `;
            } else {
                alert('Erro ao cadastrar usuário.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro. Verifique o console para mais detalhes.');
        });
    });

    document.getElementById('searchForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const searchParams = new URLSearchParams({
            name: document.getElementById('searchName').value,
            id: document.getElementById('searchId').value,
            cpf: document.getElementById('searchCpf').value
        });

        fetch(`https://backend-teste-wheat.vercel.app/api/users?${searchParams.toString()}`)
            .then(response => response.json())
            .then(data => {
                let resultsHtml = '<h3>Resultados da Busca:</h3>';
                if (data.length > 0) {
                    data.forEach(user => {
                        resultsHtml += `
                            <p>ID: ${user.id}</p>
                            <p>Nome: ${user.name}</p>
                            <p>Data de Nascimento: ${user.birthDate}</p>
                            <p>Idade: ${user.age}</p>
                            <p>CPF: ${user.cpf}</p>
                            <p>Igreja: ${user.church}</p>
                            <p>Distrito: ${user.district}</p>
                            <p>WhatsApp: ${user.whatsapp}</p>
                            <hr>
                        `;
                    });
                } else {
                    resultsHtml += '<p>Nenhum usuário encontrado.</p>';
                }
                document.getElementById('searchResults').innerHTML = resultsHtml;
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro. Verifique o console para mais detalhes.');
            });
    });
});
