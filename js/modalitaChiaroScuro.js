let darkmode = localStorage.getItem('scuro');
const themeSwitch = document.getElementById('themeSwitch');



const enableDarkmode = () => {
  document.body.classList.add('scuro');
  localStorage.setItem('scuro', 'active');
  document.getElementById('sfondo').src = 'media/backgroundHomeScuro.jpg';
}

const disableDarkmode = () => {
  document.body.classList.remove('scuro');
  localStorage.setItem('scuro', 'inactive');
  document.getElementById('sfondo').src = 'media/backgroundHome.jpg';
}

// Carica modalità all'avvio
if (darkmode === "active") {
  enableDarkmode();
}

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('scuro');
  if (darkmode !== "active") {
    enableDarkmode();
  } else {
    disableDarkmode();
  }
});
