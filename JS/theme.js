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