
let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const timeDisplay = document.getElementById("time-display");
const startStopBtn = document.getElementById("start-stop");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsList = document.getElementById("laps");


function formatTime(time) {
    const milliseconds = parseInt((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}.${milliseconds.toString().padStart(2,'0')}`;
}


function startStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            timeDisplay.textContent = formatTime(elapsedTime);
        }, 10);
        startStopBtn.textContent = "Pause";
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = "Start";
        running = false;
    }
}


function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00.00";
    startStopBtn.textContent = "Start";
    running = false;
    lapsList.innerHTML = "";
}


function lap() {
    if (running) {
        const li = document.createElement("li");
        li.textContent = formatTime(elapsedTime);
        lapsList.appendChild(li);
    }
}


startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
