/* Init Score & Display */
const scoreDisplay = document.getElementById("score-display");
const timerDisplay = document.getElementById("timer-display");
const cells = document.querySelectorAll(".cell");

let score = 0;
let timeLeft = 30;

scoreDisplay.innerText = score;
timerDisplay.innerText = timeLeft;

/* Speed Value */
let bugSpeed = 600;

/* Random Bug */
function randomBug() {
  removeBug();
  const randomNumber = Math.floor(Math.random() * cells.length);
  const cell = cells[randomNumber];
  cell.classList.add("bug");
}

const bugMovement = setInterval(randomBug, bugSpeed);

function removeBug() {
  for (let i = 0; i < cells.length; i++) {
    const cellToClean = cells[i];
    cellToClean.classList.remove("bug");
  }
}

/* Hit the bug */
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  cell.addEventListener("click", function () {
    if (cell.classList.contains("bug")) {
      score++;
      scoreDisplay.innerText = score;
      cell.classList.remove("bug");
      cell.classList.add("splat");
      setTimeout(function () {
        cell.classList.remove("splat");
      }, 200);
    }
  });
}

/* Timer */
const timer = setInterval(function () {
  timeLeft--;
  timerDisplay.innerText = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timer);
    clearInterval(bugMovement);
    removeBug();
    showMessage(`score: ${score}`);
  }
}, 1000);
