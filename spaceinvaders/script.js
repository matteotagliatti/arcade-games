const grid = document.querySelector(".grid");
const size = 15;
const rxc = size * size; // row * column
const cells = [];

/* Create Cells */
for (let i = 0; i < rxc; i++) {
  const cell = document.createElement("div");
  cells.push(cell);
  grid.appendChild(cell);
}
