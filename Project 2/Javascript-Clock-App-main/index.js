///Stopwatch////

let stHour = document.getElementById("st-hour");
let stMin = document.getElementById("st-min");
let stSec = document.getElementById("st-sec");
let stMillisec = document.getElementById("st-millisec");
let stopwatchStartBtn = document.getElementById("startBtn");
let stopwatchPauseBtn = document.getElementById("pauseBtn");
let stopwatchLapBtn = document.getElementById("lapBtn");
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
    stopwatchPauseBtn.classList.remove("hidden");
    stopwatchLapBtn.classList.remove("hidden");
};

//////resetting stopwatch on click

document.getElementById("resetBtn").onclick = () => {
    resetStopwatch();

    //hide the pause button and lap button
    stopwatchStartBtn.classList.remove("hidden");
    stopwatchPauseBtn.classList.add("hidden");
    stopwatchLapBtn.classList.add("hidden");
};

//////pausing stopwatch on click

// stopwatchPauseBtn.onclick = () => {
//     pauseStopwatch();

//     //show the pause button and lap button
//     document.getElementById("startBtn").classList.remove("hidden");
//     document.getElementById("pauseBtn").classList.add("hidden");
// };

//////lap stopwatch on click

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

////////////////////timer////////////////////////////
let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMilliseconds = 0,
    timerInterval;

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

    document.getElementById("tm-hour").innerHTML = (timerHours < 10 ? "0" : "") + timerHours;
    document.getElementById("tm-min").innerHTML = (timerMinutes < 10 ? "0" : "") + timerMinutes;
    document.getElementById("tm-sec").innerHTML = (timerSeconds < 10 ? "0" : "") + timerSeconds;
    document.getElementById("tm-millisec").innerHTML =
        (timerMilliseconds < 10 ? "0" : "") + timerMilliseconds;
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
    document.getElementById("tm-hour").innerHTML = (timerHours < 10 ? "0" : "") + timerHours;
    document.getElementById("tm-min").innerHTML = (timerMinutes < 10 ? "0" : "") + timerMinutes;
    document.getElementById("tm-sec").innerHTML = (timerSeconds < 10 ? "0" : "") + timerSeconds;
    document.getElementById("tm-millisec").innerHTML =
        (timerMilliseconds < 10 ? "0" : "") + timerMilliseconds;

    //checking if time is up
    timeUp();
};

const startTimer = () => {
    //checking for validity
    if (
        (timerHours === 0) & (timerMinutes === 0) &&
        timerSeconds === 0 &&
        timerMilliseconds === 0
    ) {
        getTime();
    } else {
        timerInterval = setInterval(timer, 10);
        document.getElementById("startBtntimer").classList.add("hidden");
        document.getElementById("stopBtntimer").classList.remove("hidden");
    }
};

const stopTimer = () => {
    clearInterval(timerInterval);
    document.getElementById("startBtntimer").classList.remove("hidden");
    document.getElementById("stopBtntimer").classList.add("hidden");
};

const resetTimer = () => {
    stopTimer();
    time = 0;
    setTime();
};

//check if time remanding is 0
const timeUp = () => {
    if (
        (timerHours === 0) & (timerMinutes === 0) &&
        timerSeconds === 0 &&
        timerMilliseconds === 0
    ) {
        resetTimer();
        alert("Time is up!");
    }
};

document.getElementById("startBtntimer").onclick = () => {
    startTimer();
};

document.getElementById("stopBtntimer").onclick = () => {
    stopTimer();
};

document.getElementById("resetBtntimer").onclick = () => {
    resetTimer();
};
