import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import throttle from "lodash.throttle";

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr("#datetime-picker", options);

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let timerId = null;
let selectedDate = null;

function updateClock() {
  const currentTime = new Date();
  const timeDifference = selectedDate - currentTime;

  if (timeDifference <= 0) {
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function startCountdown() {
  if (selectedDate) {
    startButton.disabled = true;
    timerId = setInterval(updateClock, 1000);
    updateClock(); 
  }
}

function stopCountdown() {
  clearInterval(timerId);
  timerId = null;
  startButton.disabled = false;
}

startButton.addEventListener('click', startCountdown);
stopButton.addEventListener('click', stopCountdown);

stopButton.disabled = true;