function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let intervalId = null;

// Funcția pentru schimbarea culorii de fundal
function startColorChange() {
  // Dezactivăm butonul Start
  startButton.disabled = true;
  stopButton.disabled = false;

  // Setarea intervalului pentru schimbarea culorii de fundal
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

// Funcția pentru oprirea schimbării culorii de fundal
function stopColorChange() {
  // Activăm butonul Start și dezactivăm butonul Stop
  startButton.disabled = false;
  stopButton.disabled = true;

  // Oprirea intervalului
  clearInterval(intervalId);
}

// Adăugaea evenimentelor pentru butoane
startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);

// Butonul Stop este dezactivat inițial
stopButton.disabled = true;
