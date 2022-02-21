const road = document.querySelectorAll(".running-duck div");
const duckIndex = 1;
const duck = road[duckIndex];

document.addEventListener("keydown", jumpButton);
document.addEventListener("mousedown", jump);

duck.classList.add("duck");

/* Filter only Space button without repetition */
function jumpButton(event) {
  if (event.code === "Space" && event.repeat === false) {
    jump();
  }
}

function jump() {
  duck.classList.add("duck-jump");
  setTimeout(function () {
    duck.classList.remove("duck-jump");
  }, 300);
}

for (let i = 0; i < road.length; i++) {}
