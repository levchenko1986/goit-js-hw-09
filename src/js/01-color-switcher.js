
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
const refs = {
  buttonStartColor: document.querySelector('[data-start]'),
  buttonStopColor: document.querySelector('[data-stop]'),
}
  class Colorswitcher {
    constructor() {
      this.timerId = null;
    }
    start() {
        document.body.style.backgroundColor = getRandomHexColor();
      this.timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
      refs.buttonStartColor.disabled = true;
      refs.buttonStopColor.disabled = false;
    }
    stop() {
      clearInterval(this.timerId);
      refs.buttonStartColor.disabled = false;
      refs.buttonStopColor.disabled = true;
    }
  }
  
  const colorSwitcher = new Colorswitcher();
  
  refs.buttonStartColor.addEventListener('click', colorSwitcher.start.bind(colorSwitcher));
  refs.buttonStopColor.addEventListener('click', colorSwitcher.stop.bind(colorSwitcher));