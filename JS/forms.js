document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulario');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Entraremos em contato em até 7 dias úteis!');
        this.reset();
    });
})

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact_form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            alert('Resposta: entraremos em contato em até 7 dias úteis!');
            this.reset();
        });
    }
})

document.getElementById('theme-switch').addEventListener('click', function (e) {
    e.preventDefault(); // impede comportamento padrão
    document.body.classList.toggle('darkmode');
});

document.getElementById('increase-font').addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.add('fonte-maior');
});

document.getElementById('decrease-font').addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.remove('fonte-maior');
});