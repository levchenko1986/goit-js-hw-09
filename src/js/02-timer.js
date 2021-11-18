import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectTime = null;
let currentTime = null;
let timerId = null;

refs.startBtn.addEventListener('click', onStartClick);
refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkTimeAvailable(selectedDates);
  },
};
flatpickr('#datetime-picker', options);

function checkTimeAvailable(currentDate) {
  selectTime = currentDate[0].getTime();
  currentTime = Date.now();
  if (selectTime > currentTime) {
    refs.startBtn.removeAttribute('disabled');
  } else {
    Notify.failure('Please choose a date in the future');
    const checkDisableBtn = refs.startBtn.hasAttribute('disabled');
    if (!checkDisableBtn) {
      refs.startBtn.setAttribute('disabled', true);
    }
  }
}

function onStartClick() {
  refs.input.setAttribute('disabled', true);
  refs.startBtn.setAttribute('disabled', true);
  timerId = setInterval(() => {
    currentTime = Date.now();
    const countTime = selectTime - currentTime;
    if (selectTime <= currentTime) {
      clearInterval(timerId);
      alert('You time is up!');
      return;
    }
    const time = convertMs(countTime);
    updateTime(time);
  }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
