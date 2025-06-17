document.getElementById('formulario').addEventListener('submit', function(event) {
  event.preventDefault(); // evita envio normal

  // Pega valores
  const nome = document.getElementById('nome').value.trim();
  const sobrenome = document.getElementById('sobrenome').value.trim();
  const email = document.getElementById('email').value.trim();
  const genero = document.querySelector('input[name="genero"]:checked');

  // Validação simples
  if (!nome || !sobrenome || !email || !genero) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Mostra mensagem de confirmação
  alert('Resposta: entraremos em contato em até 7 dias úteis!');

  // Aqui você pode enviar o form, resetar, ou redirecionar. Exemplo reset:
  this.reset();

  // Se quiser redirecionar, por exemplo:
  // window.location.href = 'obrigado.html';
});
