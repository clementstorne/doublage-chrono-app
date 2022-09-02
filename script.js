const checkbox = document.getElementById("checkbox");
const display = document.getElementById("screen");
const startButton = document.getElementById("start");
const interButton = document.getElementById("inter");
const finishButton = document.getElementById("finish");
const pauseButton = document.getElementById("pause");

////////////////////////////// To switch between modes //////////////////////////////

checkbox.addEventListener("change", displayTempsDiff);

let tempsDiff = null;

function displayTempsDiff() {
  if (checkbox.checked) {
    tempsDiff = true;
    display.classList.replace("hidden", "visible");
    interButton.innerText = "Intermédiaire";
    finishButton.classList.replace("hidden", "visible");
  } else {
    tempsDiff = false;
    display.classList.replace("visible", "hidden");
    interButton.innerText = "Arrivée";
    finishButton.classList.replace("visible", "hidden");
  }
}

////////////////////////////// Chronometer //////////////////////////////
const phase1 = document.getElementById("phase1");
const phase2 = document.getElementById("phase2");

let time = 0;
let ms = 0;
let s = 0;
let isPaused = false;
let activePhase = 0;

function initializeTime() {
  ms = 0;
  s = 0;
}

function updateTime(phase) {
  ms += 1;
  if (ms === 100) {
    ms = 0;
    s += 1;
  }
  switch (phase) {
    case 1:
      phase1.innerText = `${s},${ms}`;
      break;
    case 2:
      phase2.innerText = `${s},${ms}`;
      break;
    default:
      console.log("You can only choose between phase 1 and phase 2");
  }
}

function startPhase(phase) {
  time = setInterval(() => {
    updateTime(phase);
  }, 10);
}

function stop() {
  clearInterval(time);
}

function start() {
  startPhase(1);
  activePhase = 1;
  startButton.disabled = true;
  interButton.disabled = false;
  pauseButton.disabled = false;
}

function inter() {
  if (tempsDiff) {
    stop();
    initializeTime();
    startPhase(2);
    activePhase = 2;
    interButton.disabled = true;
    finishButton.disabled = false;
  } else {
    stop();
    activePhase = 0;
    interButton.disabled = true;
    pauseButton.disabled = true;
  }
}

function finish() {
  stop();
  activePhase = 0;
  finishButton.disabled = true;
  pauseButton.disabled = true;
}

function reset() {
  stop();
  initializeTime();
  phase1.innerText = "";
  phase2.innerText = "";
  startButton.disabled = false;
  interButton.disabled = true;
  finishButton.disabled = true;
}

function pause() {
  if (tempsDiff) {
    startButton.disabled = true;
    interButton.disabled = true;
    finishButton.disabled = true;
    if (isPaused) {
      startPhase(activePhase);
      isPaused = false;
      switch (activePhase) {
        case 1:
          interButton.disabled = false;
          break;
        case 2:
          finishButton.disabled = false;
      }
    } else {
      stop();
      isPaused = true;
    }
  } else {
    startButton.disabled = true;
    interButton.disabled = true;
    if (isPaused) {
      startPhase(1);
      isPaused = false;
      interButton.disabled = false;
    } else {
      stop();
      isPaused = true;
    }
  }
}
