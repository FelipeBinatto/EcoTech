document.addEventListener('DOMContentLoaded', function () {
    const limite = 500;

    const forms = ['formulario', 'contact_form'];

    forms.forEach(id => {
        const form = document.getElementById(id);
        const textarea = form ? form.querySelector('textarea') : null;
        const contador = document.getElementById('contador-caracteres');

        if (form && form.id === 'formulario' && textarea && contador) {
            contador.textContent = `0/${limite} caracteres`;
            textarea.addEventListener('input', () => {
                const tamanho = textarea.value.length;
                contador.textContent = `${tamanho}/${limite} caracteres`;
                contador.style.color = tamanho > limite ? 'red' : '';
            });
        }

        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                if (form.id === 'formulario' && textarea && textarea.value.length > limite) {
                    alert('O campo "Descreva seu produto" excedeu o limite de 500 caracteres.');
                    return;
                }

                alert('Entraremos em contato em até 7 dias úteis!');
                form.reset();

                if (form.id === 'formulario' && contador) {
                    contador.textContent = `0/${limite} caracteres`;
                    contador.style.color = '';
                }
            });
        }
    });

    // TEMAS
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
});
