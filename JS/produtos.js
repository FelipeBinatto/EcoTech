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
let darkmode = localStorage.getItem('darkmode');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'inactive');
};

// Aplica o modo salvo ao carregar
if (darkmode === 'active') {
    enableDarkmode();
} else {
    disableDarkmode();
}

// Alterna tema ao clicar no botão
if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
        darkmode = localStorage.getItem('darkmode');
        if (darkmode !== 'active') {
            enableDarkmode();
        } else {
            disableDarkmode();
        }
    });
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

