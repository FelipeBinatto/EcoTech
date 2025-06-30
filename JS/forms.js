document.addEventListener('DOMContentLoaded', function () {
    const limite = 500;
    const form = document.getElementById('formulario');
    const textarea = document.getElementById('descricao');
    const contador = document.getElementById('contador-caracteres');

    // CONTADOR DE CARACTERES
    if (textarea && contador) {
        contador.textContent = `0/${limite} caracteres`;
        textarea.addEventListener('input', () => {
            const tamanho = textarea.value.length;
            contador.textContent = `${tamanho}/${limite} caracteres`;

            if (tamanho > limite) {
                contador.style.color = 'red';
            } else {
                contador.style.color = '';
            }
        });
    }

    // ENVIO DO FORMULÁRIO
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // previne envio automático
            if (textarea.value.length > limite) {
                alert('O campo "Descreva seu produto" excedeu o limite de 500 caracteres.');
                return; // sai da função, não envia nada
            }
            alert('Entraremos em contato em até 7 dias úteis!');

            // Agora envie o formulário programaticamente (sem recarregar sem controle)
            this.submit();
        });
    }

    // TEMAS (copiado resumido, adapte se quiser)
    const themeSwitch = document.getElementById('theme-switch');
    const nextIcons = {
        light: document.querySelector('.icon-contrast'),
        dark: document.querySelector('.icon-moon'),
        contrast: document.querySelector('.icon-sun')
    };
    let themeMode = localStorage.getItem('themeMode') || 'light';

    function hideAllIcons() {
        Object.values(nextIcons).forEach(icon => {
            if (icon) icon.style.display = 'none';
        });
    }

    function showIconForNextTheme(currentTheme) {
        hideAllIcons();
        const themes = ['light', 'dark', 'contrast'];
        const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        const icon = nextIcons[nextTheme];
        if (icon) icon.style.display = 'inline';
    }

    function applyTheme(mode) {
        document.documentElement.classList.remove('darkmode', 'high-contrast');
        document.documentElement.removeAttribute('data-theme');

        switch (mode) {
            case 'dark':
                document.documentElement.classList.add('darkmode');
                document.documentElement.setAttribute('data-theme', 'dark');
                break;
            case 'contrast':
                document.documentElement.classList.add('high-contrast');
                document.documentElement.setAttribute('data-theme', 'contrast');
                break;
            default:
                document.documentElement.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('themeMode', mode);
        themeMode = mode;
        showIconForNextTheme(mode);
    }

    function cycleTheme() {
        const themes = ['light', 'dark', 'contrast'];
        const nextIndex = (themes.indexOf(themeMode) + 1) % themes.length;
        applyTheme(themes[nextIndex]);
    }

    applyTheme(themeMode);

    if (themeSwitch) {
        themeSwitch.addEventListener('click', function (e) {
            e.preventDefault();
            cycleTheme();
        });
    }

    // BOTÕES DE FONTE
    const incFont = document.getElementById('increase-font');
    const decFont = document.getElementById('decrease-font');

    if (incFont) {
        incFont.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.classList.add('fonte-maior');
        });
    }
    if (decFont) {
        decFont.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.classList.remove('fonte-maior');
        });
    }
});
