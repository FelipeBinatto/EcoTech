document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formulario');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const email = document.getElementById('email').value.trim();
    const genero = document.querySelector('input[name="genero"]:checked');
    const logradouro = document.getElementById('Logradouro').value;
    const endereco = document.getElementById('endereco').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const cep = document.getElementById('CEP').value.trim();
    const estado = document.getElementById('estado').value;
    const experiencia = document.getElementById('experiencia').value.trim();
    const foto = document.getElementById('foto').files[0];

    if (!nome || !sobrenome || !email || !genero || !logradouro || logradouro === '' ||
        !endereco || !numero || !bairro || !cidade || !cep || !estado || !experiencia || !foto) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (isNaN(numero) || parseInt(numero) <= 0) {
      alert('Número inválido.');
      return;
    }

    if (!/^\d{5}-?\d{3}$/.test(cep)) {
      alert('CEP inválido. Ex: 12345-678 ou 12345678');
      return;
    }

    alert('Resposta: entraremos em contato em até 7 dias úteis!');
    this.reset();
  });
});



