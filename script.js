const checkbox = document.getElementById("checkbox");
const display = document.getElementById("screen");
const interButton = document.getElementById("inter");
const finishButton = document.getElementById("finish");

// let isHidden = true;

checkbox.addEventListener("change", displayTempsDiff);

function displayTempsDiff() {
  if (this.checked) {
    display.classList.replace("hidden", "visible");
    interButton.innerText = "Intermédiaire";
    finishButton.classList.replace("hidden", "visible");
  } else {
    display.classList.replace("visible", "hidden");
    interButton.innerText = "Arrivée";
    finishButton.classList.replace("visible", "hidden");
  }
}
