import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

  const startBtn= document.querySelector('[data-start]');
  const timer = document.querySelector('.timer');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    if (selectedDate <= Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

let selectedDate;

flatpickr('#datetime-picker', options);

startBtn.disabled = true;

startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
  const intervalID = setInterval(() => {
    const interval = selectedDate - Date.now();
    const date = convertMs(interval);
    if (date.seconds < 0) {
      clearInterval(intervalID);
      return;
    }
    updateTimer(date);
  }, 1000);
  if (selectedDate >= Date.now()) {
    return Notify.success('Your beautiful!!!');
  }
}

function updateTimer({ days, hours, minutes, seconds }) {
  timer.querySelector('[data-days]').textContent = pad(days);
  timer.querySelector('[data-hours]').textContent = pad(hours);
  timer.querySelector('[data-minutes]').textContent = pad(minutes);
  timer.querySelector('[data-seconds]').textContent = pad(seconds);
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

function pad(value) {
  return value.toString().padStart(2, '0');
}