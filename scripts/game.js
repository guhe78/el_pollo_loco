let canvas;
let world;
let keyboard = new Keyboard();

function loadCanvas() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) return;

  if (target.id === "start-btn" || target.id === "resume-btn") {
    world.startGame();
  }

  if (target.id === "restart-btn") {
    location.reload();
  }

  if (target.id === "mainmenu-btn") {
    world.startMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    keyboard.SPACE = true;
  }
  if (event.code === "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (event.code === "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (event.code === "ArrowUp") {
    keyboard.UP = true;
  }
  if (event.code === "ArrowDown") {
    keyboard.DOWN = true;
  }
  if (event.code === "KeyT") {
    keyboard.THROW = true;
  }
  if (event.code === "Escape") {
    world.togglePause();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    keyboard.SPACE = false;
  }
  if (event.code === "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (event.code === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (event.code === "ArrowUp") {
    keyboard.UP = false;
  }
  if (event.code === "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (event.code === "KeyT") {
    keyboard.THROW = false;
  }
});
