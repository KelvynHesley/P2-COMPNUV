document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('aluno-form');
    const messageDiv = document.getElementById('message');
    const submitButton = document.getElementById('submit-button');

    form.addEventListener('submit', async (event) => {
        
        event.preventDefault(); 
        
        messageDiv.textContent = '';
        messageDiv.className = '';
        submitButton.disabled = true; 

        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3001/alunos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            });

            const result = await response.json();

            if (response.ok) { 
                messageDiv.textContent = result.message;
                messageDiv.className = 'success'; 
                form.reset(); 
            } else {
                messageDiv.textContent = `Erro: ${result.error}`;
                messageDiv.className = 'error'; 
            }

        } catch (error) {
            console.error('Erro de rede:', error);
            messageDiv.textContent = 'Não foi possível conectar ao servidor. Verifique o console.';
            messageDiv.className = 'error';
        } finally {
            submitButton.disabled = false; 
        }
    });
});