const DISPLAY_MODE_KEY = "displayMode"; // "standard" | "fullscreen"

let canvas;
let world;
let keyboard = new Keyboard();

function loadCanvas() {
  canvas = document.getElementById("canvas");
  applyDisplayMode();
  world = new World(canvas, keyboard);
}

document.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.id === "settings-btn") {
    if (isMobileDevice()) return;

    const nextMode =
      getDisplayMode() === "standard" ? "fullscreen" : "standard";
    setDisplayMode(nextMode);
    applyDisplayMode();
    target.textContent =
      nextMode === "fullscreen"
        ? "Einstellungen (Modus: Vollbild 2x)"
        : "Einstellungen (Modus: Standard 720x480)";
    return;
  }

  if (target.id === "start-btn") {
    world.startGame();
    return;
  }

  if (target.id === "resume-btn") {
    world.startGame();
    return;
  }

  if (target.id === "restart-btn") {
    world.restartGame();
    return;
  }

  if (target.id === "mainmenu-btn") {
    world.startMenu();
    return;
  }
  if (target.id === "howto-btn") {
    world.showHowTo();
    return;
  }
  if (target.id === "back-btn") {
    world.startMenu();
    return;
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
  if (event.code === "KeyD") {
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
  if (event.code === "KeyD") {
    keyboard.THROW = false;
  }
});

function getDisplayMode() {
  return localStorage.getItem(DISPLAY_MODE_KEY) || "standard";
}

function setDisplayMode(mode) {
  localStorage.setItem(DISPLAY_MODE_KEY, mode);
}

function isMobileDevice() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function applyDisplayMode() {
  const mode = getDisplayMode();

  if (isMobileDevice()) {
    document.body.classList.add("mode-fullscreen");
    return;
  }

  document.body.classList.toggle("mode-fullscreen", mode === "fullscreen");
}
