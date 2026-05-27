const DISPLAY_MODE_KEY = "displayMode"; // "standard" | "fullscreen"
const SOUND_ENABLED_KEY = "soundEnabled";

let canvas;
let world;
let keyboard = new Keyboard();

function loadCanvas() {
  canvas = document.getElementById("canvas");
  applyDisplayMode();
  world = new World(canvas, keyboard);
  applySoundMode();
}

document.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.id === "settings-btn") {
    world.showSettings();
    return;
  }

  if (target.id === "start-btn") {
    applyDisplayMode();
    world.startGame();
    return;
  }

  if (target.id === "resume-btn") {
    world.startGame();
    return;
  }

  if (target.id === "mobile-pause-btn") {
    world.togglePause();
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

  if (target.id === "display-standard-btn") {
    if (!isMobileDevice()) {
      setDisplayMode("standard");
      if (world.menuReturnState === "paused") {
        applyDisplayMode();
      }
    }
    world.setGameState("settings");
    return;
  }

  if (target.id === "display-fullscreen-btn") {
    if (!isMobileDevice()) {
      setDisplayMode("fullscreen");
      if (world.menuReturnState === "paused") {
        applyDisplayMode();
      }
    }
    world.setGameState("settings");
    return;
  }

  if (target.id === "sound-toggle-btn") {
    const next = !getSoundEnabled();
    setSoundEnabled(next);
    applySoundMode();
    world.setGameState("settings");
    return;
  }

  if (target.id === "back-settings-btn") {
    world.closeOverlayMenu();
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
  const isMobile = isMobileDevice();
  const mode = getDisplayMode();

  document.body.classList.toggle("is-mobile", isMobile);
  document.body.classList.toggle(
    "mode-fullscreen",
    isMobile || mode === "fullscreen",
  );
}

function getSoundEnabled() {
  return localStorage.getItem(SOUND_ENABLED_KEY) !== "false";
}

function setSoundEnabled(enabled) {
  localStorage.setItem(SOUND_ENABLED_KEY, String(enabled));
}

function applySoundMode() {
  if (!world) return;
  world.setSoundEnabled(getSoundEnabled());
}

function setupMobileControls() {
  const pauseBtn = document.getElementById("mobile-pause-btn");
  if (pauseBtn) {
    pauseBtn.addEventListener("click", (event) => {
      event.preventDefault();
      world.togglePause();
    });
  }

  bindHoldControl("mobile-up-btn", "UP");
  bindHoldControl("mobile-down-btn", "DOWN");
  bindHoldControl("mobile-left-btn", "LEFT");
  bindHoldControl("mobile-right-btn", "RIGHT");
  bindHoldControl("mobile-throw-btn", "THROW");
  bindHoldControl("mobile-slap-btn", "SPACE");
}

function bindHoldControl(buttonId, keyName) {
  const button = document.getElementById(buttonId);
  if (!button) return;

  const press = (event) => {
    event.preventDefault();
    keyboard[keyName] = true;
  };

  const release = (event) => {
    event.preventDefault();
    keyboard[keyName] = false;
  };

  button.addEventListener("pointerdown", press);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("pointerleave", release);
}
