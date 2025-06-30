const slider = document.querySelectorAll('.slider');
const bntPrev = document.getElementById('prev-button');
const bntNext = document.getElementById('next-button');

let currentSlide = 0;

function hideSlider() {
  slider.forEach(item => item.classList.remove('on'));
}

function showSlider() {
  slider[currentSlide].classList.add('on');
}

function nextSlider() {
  hideSlider();
  if (currentSlide === slider.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  showSlider();
}

function prevSlider() {
  hideSlider();
  if (currentSlide === 0) {
    currentSlide = slider.length - 1;
  } else {
    currentSlide--;
  }
  showSlider();
}

bntNext.addEventListener('click', nextSlider);
bntPrev.addEventListener('click', prevSlider);

setInterval(() => {
  nextSlider();
}, 8000);

const themeSwitch = document.getElementById('theme-switch');

let themeMode = localStorage.getItem('themeMode') || 'light';

const updateIcon = () => {
  const icons = {
    light: document.querySelector('.icon-moon'),
    dark: document.querySelector('.icon-sun'),
    contrast: document.querySelector('.icon-contrast')
  };

  Object.values(icons).forEach(icon => {
    if (icon) icon.style.display = 'none';
  });

  if (icons[themeMode]) {
    icons[themeMode].style.display = 'inline';
  }
};

const applyTheme = (mode) => {
  document.body.classList.remove('darkmode', 'high-contrast');
  document.documentElement.classList.remove('darkmode', 'high-contrast');
  document.documentElement.removeAttribute('data-theme');

  if (mode === 'dark') {
    document.body.classList.add('darkmode');
    document.documentElement.classList.add('darkmode');
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (mode === 'contrast') {
    document.body.classList.add('high-contrast');
    document.documentElement.classList.add('high-contrast');
    document.documentElement.setAttribute('data-theme', 'contrast');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  localStorage.setItem('themeMode', mode);

  // --- INÍCIO DO CÓDIGO DO POP-UP ---
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
  // --- FIM DO CÓDIGO DO POP-UP ---

  updateIcon();
};

const cycleTheme = () => {
  themeMode = themeMode === 'light' ? 'dark'
    : themeMode === 'dark' ? 'contrast'
      : 'light';
  applyTheme(themeMode);
};

applyTheme(themeMode);

if (themeSwitch) {
  themeSwitch.addEventListener('click', cycleTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menuList = document.getElementById("menu-list");
  const chk = document.getElementById("chk");

  // Hamburguer menu
  toggle.addEventListener("click", () => {
    menuList.classList.toggle("show");
  });

});


