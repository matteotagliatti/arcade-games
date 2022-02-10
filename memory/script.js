const grid = document.querySelector(".grid");
const errorCounter = document.getElementById("error");
const cards = ["alien", "bug", "duck", "rocket", "spaceship", "ticktac"];
const deck = [...cards, ...cards];

let pick = [];
let error = 0;

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

errorCounter.innerText = error;

/* Add a front to the card */
function flipCard(event) {
  const card = event.target;
  /* Stop when already flipped */
  if (card.classList.contains("flipped")) return;
  card.classList.add(card.getAttribute("data-name"), "flipped");
  pick.push(card);
  if (pick.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const card1 = pick[0];
  const card2 = pick[1];
  const card1Name = card1.getAttribute("data-name");
  const card2Name = card2.getAttribute("data-name");
  if (card1Name === card2Name) {
    checkForWin();
  } else {
    error++;
    errorCounter.innerText = error;
    setTimeout(function () {
      card1.classList.remove(card1Name, "flipped");
      card2.classList.remove(card2Name, "flipped");
    }, 500);
  }
  pick = [];
}

function checkForWin() {
  const flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length === deck.length) {
    showMessage("You win!");
  }
}
