const grid = document.querySelector(".grid");
const size = 15;
const rxc = size * size; // row * column
const cells = [];

const aliens = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];
const aliensKilled = [];

let alienMoveIntVal = null;

/* Create Cells */
for (let i = 0; i < rxc; i++) {
  const cell = document.createElement("div");
  cells.push(cell);
  grid.appendChild(cell);
}

/* Win or Lose */
function checkForHumanWin() {
  if (aliensKilled.length === aliens.length) {
    showMessage("HUMAN WINS");
    clearInterval(alienMoveIntVal);
  }
}

function checkForAlienWin() {
  for (let i = 0; i < aliens.length; i++) {
    if (!aliensKilled.includes(aliens[i]) && aliens[i] >= spaceshipIndex) {
      showMessage("ALIEN WINS");
      clearInterval(alienMoveIntVal);
    }
  }
}

/* ALIENS */
function drawAliens() {
  for (let i = 0; i < aliens.length; i++) {
    if (!aliensKilled.includes(i)) {
      cells[aliens[i]].classList.add("alien");
    }
  }
}

function removeAliens() {
  for (let i = 0; i < aliens.length; i++) {
    cells[aliens[i]].classList.remove("alien");
  }
}

let step = 1; // number of movement of the aliens
let direction = "forward";

function moveAliens() {
  const leftEdge = aliens[0] % size === 0; // express a if condition. When correct const leftEdge is true.
  const rightEdge = aliens[aliens.length - 1] % size === size - 1;

  removeAliens();

  // When i'm on the right edge
  if (direction === "forward" && rightEdge) {
    for (let i = 0; i < aliens.length; i++) {
      aliens[i] = aliens[i] + size + 1;
      step = -1;
      direction = "backward";
    }
  }

  // When i'm on the left edge
  if (direction === "backward" && leftEdge) {
    for (let i = 0; i < aliens.length; i++) {
      aliens[i] = aliens[i] + size - 1;
      step = 1;
      direction = "forward";
    }
  }

  for (let i = 0; i < aliens.length; i++) {
    aliens[i] = aliens[i] + step;
  }

  checkForAlienWin();
  drawAliens();
}

alienMoveIntVal = setInterval(moveAliens, 100);

/* 
  SPACESHIP
  Move
*/
let spaceshipIndex = 217;
cells[spaceshipIndex].classList.add("spaceship");

function moveSpaceship(event) {
  const leftEdge = spaceshipIndex % size === 0;
  const rightEdge = spaceshipIndex % size === 14;

  cells[spaceshipIndex].classList.remove("spaceship");

  if (event.code === "ArrowLeft" && !leftEdge) {
    spaceshipIndex--;
  } else if (event.code === "ArrowRight" && !rightEdge) {
    spaceshipIndex++;
  }

  cells[spaceshipIndex].classList.add("spaceship");
}

document.addEventListener("keydown", moveSpaceship);

/* Shoot */
function shoot(event) {
  if (event.code !== "Space") return;

  let laserIndex = spaceshipIndex;
  let laserIntVal = null;

  function moveLaser() {
    cells[laserIndex].classList.remove("laser");
    laserIndex = laserIndex - 15;

    if (laserIndex < 0) {
      clearInterval(laserIntVal);
      return;
    }

    /* Check if shoot alien */
    if (cells[laserIndex].classList.contains("alien")) {
      clearInterval(laserIntVal);
      cells[laserIndex].classList.remove("alien", "laser");
      cells[laserIndex].classList.add("boom");
      setTimeout(function () {
        cells[laserIndex].classList.remove("boom");
      }, 200);

      const killed = aliens.indexOf(laserIndex);
      aliensKilled.push(killed);

      checkForHumanWin();

      return;
    }

    cells[laserIndex].classList.add("laser");
  }

  laserIntVal = setInterval(moveLaser, 200);
}

document.addEventListener("keydown", shoot);
