let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown); //clears timers when selecting another one
    const now = Date.now(); //gives current timestamp in ms
    const then = now + seconds * 1000; //adds on seconds to current time to give end time
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {     //set interval shows how many seconds left on timer
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) { //check if we should stop
            clearInterval(countdown);
            return;
        } //display
        displayTimeLeft(secondsLeft);
    }, 1000); //run every 1second
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`; //puts 0 before smaller numbers
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour; //not 24 hour clock
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
    console.log({hour, minutes});
}

function startTimer() {
    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60); //set new timer manually 
    this.reset();
});