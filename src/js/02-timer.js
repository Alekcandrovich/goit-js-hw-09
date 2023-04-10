import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const parameter = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    const chosenDate = selectedDates[0];
    const currentDate = new Date();

    if (chosenDate < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
      return;
    }

    const startButton = document.querySelector('[data-start]');

    if (startButton.dataset.started === 'true') {
      startButton.disabled = true;
      return;
    }

    startButton.addEventListener('click', function () {
      const countdown = setInterval(function () {
        const currentNow = new Date().getTime();
        const gapTime = chosenDate - currentNow;
        const timeObject = convertMs(gapTime);

        document.querySelector('[data-days]').innerText = addLeadingZero(
          timeObject.days
        );
        document.querySelector('[data-hours]').innerText = addLeadingZero(
          timeObject.hours
        );
        document.querySelector('[data-minutes]').innerText = addLeadingZero(
          timeObject.minutes
        );
        document.querySelector('[data-seconds]').innerText = addLeadingZero(
          timeObject.seconds
        );

        if (gapTime < 0) {
          clearInterval(countdown);
          document.querySelector('[data-days]').innerText = '00';
          document.querySelector('[data-hours]').innerText = '00';
          document.querySelector('[data-minutes]').innerText = '00';
          document.querySelector('[data-seconds]').innerText = '00';
          startButton.dataset.started = 'false';
        }
      }, 1000);

      startButton.dataset.started = 'true';
      startButton.disabled = true;
    });
  },
});

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
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};