//------------------Variable declaration----------------------//

///////////Stopwatch//////--------------------------

let stHour = document.getElementById("st-hour");
let stMin = document.getElementById("st-min");
let stSec = document.getElementById("st-sec");
let stMillisec = document.getElementById("st-millisec");
let stopwatchStartBtn = document.getElementById("startBtn");
let stopwatchPauseBtn = document.getElementById("pauseBtn");
let stopwatchLapBtn = document.getElementById("lapBtn");
let stopwatchResetBtn = document.getElementById("resetBtn");

///////////Timer//////--------------------------
let timerHourEle = document.getElementById("tm-hour");
let timerMinEle = document.getElementById("tm-min");
let timerSecEle = document.getElementById("tm-sec");
let timerMillisecEle = document.getElementById("tm-millisec");

let timerStartBtn = document.getElementById("startBtntimer");
let timerStopBtn = document.getElementById("stopBtntimer");
let timerResetBtn = document.getElementById("resetBtntimer");
let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMilliseconds = 0,
    timerInterval;

////////ToggleButtons//////-----------------------

let stopwatchButton = document.getElementById("stopwatchToggleBtn");
let timerButton = document.getElementById("timerToggleBtn");

//////Wrapper Blocks///////

let stopwatchWrapper = document.querySelector(".stinnerWrapper");
let timerWrapper = document.querySelector(".tminnerWrapper");

///------------------Stopwatch--------------------////

//declaring variables
let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMilliseconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

let stopwatch = () => {
    //incrementing millisecond
    stopwatchMilliseconds++;
    //incrementing seconds
    if (stopwatchMilliseconds === 100) {
        stopwatchMilliseconds = 0;
        stopwatchSeconds++;
    }
    //incrementing minutes
    if (stopwatchSeconds === 60) {
        stopwatchSeconds = 0;
        stopwatchMinutes++;
    }
    //incrementing hours
    if (stopwatchMinutes === 60) {
        stopwatchMinutes = 0;
        stopwatchHours++;
    }
    //displaying time
    stHour.innerHTML = (stopwatchHours < 10 ? "0" : "") + stopwatchHours;
    stMin.innerHTML = (stopwatchMinutes < 10 ? "0" : "") + stopwatchMinutes;
    stSec.innerHTML = (stopwatchSeconds < 10 ? "0" : "") + stopwatchSeconds;
    stMillisec.innerHTML = (stopwatchMilliseconds < 10 ? "0" : "") + stopwatchMilliseconds;
};

/////to start the stopwatch function

const startStopwatch = () => {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
};

////to stop the stopwatch function

const stopStopwatch = () => {
    if (stopwatchRunning) {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
    }
};

///reset stopwatch function

const resetStopwatch = () => {
    //clear interval and reset all values
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMilliseconds = 0;
    laps = 0;

    stHour.innerHTML = "00";
    stMin.innerHTML = "00";
    stSec.innerHTML = "00";
    stMillisec.innerHTML = "00";
};
///pausing the stopwatch function

const pauseStopwatch = () => {
    //clear interval and reset all values
    clearInterval(stopwatchInterval);
};

/////starting stopwatch on click

stopwatchStartBtn.onclick = () => {
    startStopwatch();

    //show the pause button and lap button
    stopwatchStartBtn.classList.add("hidden");
    stopwatchLapBtn.classList.remove("hidden");
};

//////resetting stopwatch on click

stopwatchResetBtn.onclick = () => {
    resetStopwatch();

    //hide the pause button and lap button
    stopwatchStartBtn.classList.remove("hidden");
    stopwatchLapBtn.classList.add("hidden");
    //deleting the laps
    document.querySelectorAll(".lap").forEach((e) => {
        e.remove();
    });
};

//////lap stopwatch on click/////////

stopwatchLapBtn.onclick = () => {
    //increment lap
    laps++;

    //create a new lap
    let newLap = document.createElement("div");
    newLap.classList.add("lap");
    newLap.innerHTML = `
        <p>Lap ${laps}</p>
        <p>${(stopwatchHours < 10 ? "0" : "") + stopwatchHours}:${
        (stopwatchMinutes < 10 ? "0" : "") + stopwatchMinutes
    }:${(stopwatchSeconds < 10 ? "0" : "") + stopwatchSeconds}:${
        (stopwatchMilliseconds < 10 ? "0" : "") + stopwatchMilliseconds
    }</p>
    `;

    //append lap to lap list
    document
        .getElementById("laps")
        .insertBefore(newLap, document.getElementById("laps").firstChild);
    document.querySelectorAll(".lap").forEach((e) => {
        e.classList.remove("active");
    });
    document.querySelectorAll(".lap")[0].classList.add("active");
};
///////-------------------------TIMER-------------------------/////////

const getTime = () => {
    time = prompt("Enter time in minutes :)");
    //converting to seconds
    time = time * 60;

    //function to update timer default values
    setTime();
};

const setTime = () => {
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = time % 60;
    timerMilliseconds = 0;

    //displaying time

    timerHourEle.innerHTML = (timerHours < 10 ? "0" : "") + timerHours;
    timerMinEle.innerHTML = (timerMinutes < 10 ? "0" : "") + timerMinutes;
    timerSecEle.innerHTML = (timerSeconds < 10 ? "0" : "") + timerSeconds;
    timerMillisecEle.innerHTML = (timerMilliseconds < 10 ? "0" : "") + timerMilliseconds;
};

const timer = () => {
    //decrementing time
    timerMilliseconds--;
    if (timerMilliseconds === -1) {
        timerMilliseconds = 99;
        timerSeconds--;
    }
    if (timerSeconds === -1) {
        timerSeconds = 59;
        timerMinutes--;
    }
    if (timerMinutes === -1) {
        timerMinutes = 59;
        timerHours--;
    }

    //update time
    timerHourEle.innerHTML = (timerHours < 10 ? "0" : "") + timerHours;
    timerMinEle.innerHTML = (timerMinutes < 10 ? "0" : "") + timerMinutes;
    timerSecEle.innerHTML = (timerSeconds < 10 ? "0" : "") + timerSeconds;
    timerMillisecEle.innerHTML = (timerMilliseconds < 10 ? "0" : "") + timerMilliseconds;

    //checking if time is up
    timeUp();
};

const startTimer = () => {
    timerWrapper.style.background = "linear-gradient(45deg, #2193b0, #6dd5ed)";

    //checking for validity
    if (
        (timerHours === 0) & (timerMinutes === 0) &&
        timerSeconds === 0 &&
        timerMilliseconds === 0
    ) {
        getTime();
    } else {
        timerInterval = setInterval(timer, 10);
        timerStartBtn.classList.add("hidden");
        timerStopBtn.classList.remove("hidden");
    }
};

const stopTimer = () => {
    timerWrapper.style.background = "linear-gradient(45deg, #eacda3, #d6ae7b)";

    clearInterval(timerInterval);
    timerStartBtn.classList.remove("hidden");
    timerStopBtn.classList.add("hidden");
};

const resetTimer = () => {
    stopTimer();
    time = 0;
    setTime();
    timerWrapper.style.background = "linear-gradient(45deg, #2193b0, #6dd5ed)";
};

//check if time remanding is 0
const timeUp = () => {
    if (
        (timerHours === 0) & (timerMinutes === 0) &&
        timerSeconds === 0 &&
        timerMilliseconds === 0
    ) {
        resetTimer();
        timerWrapper.style.background = "linear-gradient(45deg, #eb3349, #f45c43)";
    }
};

timerStartBtn.onclick = () => {
    startTimer();
};

timerStopBtn.onclick = () => {
    stopTimer();
};

timerResetBtn.onclick = () => {
    resetTimer();
};

///////////////////Button to TOggle///////////////

stopwatchButton.addEventListener("click", () => {
    stopwatchWrapper.classList.remove("hidden");
    timerWrapper.classList.add("hidden");
});

timerButton.addEventListener("click", () => {
    stopwatchWrapper.classList.add("hidden");
    timerWrapper.classList.remove("hidden");
});
