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
});