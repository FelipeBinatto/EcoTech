document.addEventListener('DOMContentLoaded', function() {
  
  const themeSwitch = document.getElementById('theme-switch');
  
 
  const nextIcons = {
    light: document.querySelector('.icon-moon'),
    dark: document.querySelector('.icon-sun'),
    contrast: document.querySelector('.icon-contrast')
  };

  
  let themeMode = localStorage.getItem('themeMode') || 'light';

  
  function hideAllIcons() {
    Object.values(nextIcons).forEach(icon => {
      if (icon) icon.style.display = 'none';
    });
  }

  function showIconForNextTheme(currentTheme) {
    hideAllIcons();
    const icon = nextIcons[currentTheme];
    if (icon) icon.style.display = 'inline';
  }


  function applyTheme(mode) {
    
    document.documentElement.classList.remove('darkmode', 'high-contrast');
    document.documentElement.removeAttribute('data-theme');

   
    switch(mode) {
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
    const currentIndex = themes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % themes.length;
    applyTheme(themes[nextIndex]);
  }

  
  applyTheme(themeMode);

  
  if (themeSwitch) {
    themeSwitch.addEventListener('click', cycleTheme);
  }
});