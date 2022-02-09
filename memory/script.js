const grid = document.querySelector(".grid");
const cards = ["alien", "bug", "duck", "rocket", "spaceship", "ticktac"];
const deck = [...cards, ...cards];

let pick = [];

deck.sort(function () {
  /* Generdom value for random deck assort */
  return 0.5 - Math.random();
});

/* Generate cards */
for (let i = 0; i < deck.length; i++) {
  const card = document.createElement("div");
  const cardName = deck[i];
  card.classList.add("card");
  card.setAttribute("data-name", cardName);
  card.addEventListener("click", flipCard);
  grid.appendChild(card);
}

/* Add a front to the card */
function flipCard(event) {
  const card = event.target;
  /* Stop when already flipped */
  if (card.classList.contains("flipped")) return;
  card.classList.add(card.getAttribute("data-name"), "flipped");
  pick.push(card);
}
