const root = document.documentElement;
const incBtn = document.getElementById('increase-font');
const decBtn = document.getElementById('decrease-font');

const step = 0.1;
const min = 0.75;
const max = 1.5;

const savedScale = localStorage.getItem('font-scale');
if (savedScale) {
  root.style.setProperty('--font-scale', savedScale);
}

function updateFontScale(delta) {
  let scale = parseFloat(getComputedStyle(root).getPropertyValue('--font-scale')) || 1;

  scale = Math.min(max, Math.max(min, scale + delta));
  const newScale = scale.toFixed(2);

  root.style.setProperty('--font-scale', newScale);
  localStorage.setItem('font-scale', newScale); // Salva
}

incBtn.addEventListener('click', () => updateFontScale(step));
decBtn.addEventListener('click', () => updateFontScale(-step));
