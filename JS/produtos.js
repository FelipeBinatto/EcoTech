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

})



