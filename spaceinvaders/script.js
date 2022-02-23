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
  const leftEdge = aliens[0] % size === 0;
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
