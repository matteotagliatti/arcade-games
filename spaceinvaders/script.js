const grid = document.querySelector(".grid");
const size = 15;
const rxc = size * size; // row * column
const cells = [];

const aliens = [0, 1, 2, 3, 4, 5];

/* Create Cells */
for (let i = 0; i < rxc; i++) {
  const cell = document.createElement("div");
  cells.push(cell);
  grid.appendChild(cell);
}

/* ALIENS */
function drawAliens() {
  for (let i = 0; i < aliens.length; i++) {
    cells[aliens[i]].classList.add("alien");
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
  drawAliens();
}

setInterval(moveAliens, 500);

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

    cells[laserIndex].classList.add("laser");
  }

  laserIntVal = setInterval(moveLaser, 200);
}

document.addEventListener("keydown", shoot);
