const scoreDisplay = document.getElementById("score-display");
const road = document.querySelectorAll(".running-duck div");
const duckIndex = 1;
const duck = road[duckIndex];
let speed = 200;
let score = 0;

scoreDisplay.innerText = score;

document.addEventListener("keydown", jumpButton);
document.addEventListener("mousedown", jump);

duck.classList.add("duck");

/* Plant */
function addPlant() {
  /* Add Plant */
  let currentPlantIndex = road.length - 1;
  road[currentPlantIndex].classList.add("plant");

  /* Plant Movement */
  const plantInterval = setInterval(function () {
    road[currentPlantIndex].classList.remove("plant");
    currentPlantIndex--;

    /* When plant is at the end, after the duck */
    if (currentPlantIndex < 0) {
      clearInterval(plantInterval);
      addPlant();
      return;
    }

    /* Check if there plant crash with duck */
    if (
      currentPlantIndex === duckIndex &&
      !road[currentPlantIndex].classList.contains("duck-jump")
    ) {
      clearInterval(plantInterval);
      road[currentPlantIndex].classList.remove("duck");
      road[currentPlantIndex].classList.add("plant");
      showMessage(`score: ${score}`);
      return;
    }

    /* Add score */
    if (
      currentPlantIndex === duckIndex &&
      road[currentPlantIndex].classList.contains("duck-jump")
    ) {
      score++;
      scoreDisplay.innerText = score;
      /* More speed every 3 score */
      if (score % 3 === 0) {
        speed = speed - 20;
      }
    }

    road[currentPlantIndex].classList.add("plant");
  }, speed);
}

addPlant();

/* Filter only Space button without repetition */
function jumpButton(event) {
  if (event.code === "Space" && event.repeat === false) {
    jump();
  }
}

/* Jump */
function jump() {
  duck.classList.add("duck-jump");
  setTimeout(function () {
    duck.classList.remove("duck-jump");
  }, 300);
}
