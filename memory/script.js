const grid = document.querySelector(".grid");
const cards = ["alien", "bug", "duck", "rocket", "spaceship", "ticktac"];
const deck = [...cards, ...cards];

/* Generate cards */
for (let i = 0; i < deck.length; i++) {
  const card = document.createElement("div");
  card.classList.add("card");
  grid.appendChild(card);
}
