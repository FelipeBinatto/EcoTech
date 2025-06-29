document.addEventListener('DOMContentLoaded', function () {
    // Lida com múltiplos formulários
    const forms = ['formulario', 'contact_form'];
    forms.forEach(id => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                alert('Entraremos em contato em até 7 dias úteis!');
                this.reset();
            });
        }
    });

    // Elementos
    const themeSwitch = document.getElementById('theme-switch');
    const nextIcons = {
        light: document.querySelector('.icon-contrast'),       // próximo tema light → ícone sol
        dark: document.querySelector('.icon-moon'),       // próximo tema dark → ícone lua
        contrast: document.querySelector('.icon-sun') // próximo tema contrast → ícone contraste
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
        // --- POP-UP DE MODO CONTRASTE ---
        let popup = document.getElementById('contrast-popup');

        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'contrast-popup';
            popup.setAttribute('role', 'alert');
            popup.setAttribute('aria-live', 'assertive');
            popup.textContent = 'Modo de alto contraste ativado. Este modo foi desenvolvido para pessoas com deficiência visual.';
            popup.style.position = 'fixed';
            popup.style.bottom = '20px';
            popup.style.left = '50%';
            popup.style.transform = 'translateX(-50%)';
            popup.style.backgroundColor = '#222';
            popup.style.color = '#00ffdd';
            popup.style.padding = '1rem 1.5rem';
            popup.style.borderRadius = '8px';
            popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
            popup.style.fontSize = '1rem';
            popup.style.zIndex = '9999';
            popup.style.display = 'none';
            popup.style.animation = 'fadeInOut 4s ease-in-out';
            document.body.appendChild(popup);
        }

        if (popup.hideTimeout) {
            clearTimeout(popup.hideTimeout);
            popup.hideTimeout = null;
        }

        if (mode === 'contrast') {
            if (!sessionStorage.getItem('contrastPopupShown')) {
                popup.style.display = 'block';
                popup.classList.remove('popup');
                void popup.offsetWidth; // força reflow para animação
                popup.classList.add('popup');

                sessionStorage.setItem('contrastPopupShown', 'true');

                popup.hideTimeout = setTimeout(() => {
                    popup.style.display = 'none';
                    popup.hideTimeout = null;
                }, 4000);
            }
        } else {
            popup.style.display = 'none';
        }
        // --- FIM DO POP-UP ---

    }

    function cycleTheme() {
        const themes = ['light', 'dark', 'contrast'];
        const nextIndex = (themes.indexOf(themeMode) + 1) % themes.length;
        applyTheme(themes[nextIndex]);
    }

    // Inicializa o tema salvo
    applyTheme(themeMode);

    // Evento de troca de tema
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function (e) {
            e.preventDefault();
            cycleTheme();
        });
    }

    // Aumentar e diminuir fonte
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
