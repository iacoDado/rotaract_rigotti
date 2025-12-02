const themeSwitch = document.getElementById('themeSwitch');

const enableDarkmode = () => {
  document.body.classList.add('scuro');
  localStorage.setItem('scuro', 'active');

  const sfondo = document.getElementById('sfondo');
  if (sfondo) sfondo.src = 'media/backgroundHomeScuro.jpg';
}

const disableDarkmode = () => {
  document.body.classList.remove('scuro');
  localStorage.setItem('scuro', 'inactive');

  const sfondo = document.getElementById('sfondo');
  if (sfondo) sfondo.src = 'media/backgroundHome.jpg';
}

// Carica modalità all'avvio
if (localStorage.getItem('scuro') === 'active') {
  enableDarkmode();
}

// Toggle
if (themeSwitch) {
  themeSwitch.addEventListener("click", () => {
    if (document.body.classList.contains('scuro')) {
      disableDarkmode();
    } else {
      enableDarkmode();
    }
  });
}
