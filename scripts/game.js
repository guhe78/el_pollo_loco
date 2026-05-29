const DISPLAY_MODE_KEY = "displayMode"; // "standard" | "fullscreen"
const SOUND_ENABLED_KEY = "soundEnabled";

let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes canvas, world and control systems.
 */
function loadCanvas() {
  canvas = document.getElementById("canvas");
  applyDisplayMode();
  world = new World(canvas, keyboard);
  applySoundMode();
  setupMobileControls();
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

  if (target.id === "restart-btn") {
    world.restartGame();
    return;
  }

  if (target.id === "mainmenu-btn") {
    world.abortGameToMenu();
    return;
  }

  if (target.id === "howto-btn") {
    world.showHowTo();
    return;
  }

  if (target.id === "impressum-btn") {
    world.showImpressum();
    return;
  }

  if (target.id === "back-btn") {
    world.closeOverlayMenu();
    return;
  }

  if (target.id === "back-impressum-btn") {
    world.closeOverlayMenu();
    return;
  }

  if (target.id === "display-toggle-btn") {
    if (!isMobileDevice()) {
      const nextMode =
        getDisplayMode() === "fullscreen" ? "standard" : "fullscreen";
      setDisplayMode(nextMode);
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

/**
 * Returns persisted display mode.
 * @returns {*} Result value.
 */
function getDisplayMode() {
  return localStorage.getItem(DISPLAY_MODE_KEY) || "standard";
}

/**
 * Persists selected display mode.
 * @param {*} mode
 */
function setDisplayMode(mode) {
  localStorage.setItem(DISPLAY_MODE_KEY, mode);
}

/**
 * Detects whether current device uses coarse pointer input.
 * @returns {*} Result value.
 */
function isMobileDevice() {
  return window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Applies display mode CSS classes to the page.
 */
function applyDisplayMode() {
  const isMobile = isMobileDevice();
  const mode = getDisplayMode();

  document.body.classList.toggle("is-mobile", isMobile);
  document.body.classList.toggle(
    "mode-fullscreen",
    isMobile || mode === "fullscreen",
  );
}

/**
 * Returns persisted sound setting.
 * @returns {*} Result value.
 */
function getSoundEnabled() {
  return localStorage.getItem(SOUND_ENABLED_KEY) !== "false";
}

/**
 * Persists sound enabled state.
 * @param {*} enabled
 */
function setSoundEnabled(enabled) {
  localStorage.setItem(SOUND_ENABLED_KEY, String(enabled));
}

/**
 * Applies current sound setting to active world instance.
 */
function applySoundMode() {
  if (!world) return;
  world.setSoundEnabled(getSoundEnabled());
}

/**
 * Wires mobile control buttons to keyboard state.
 */
function setupMobileControls() {
  const pauseBtn = document.getElementById("mobile-pause-btn");
  if (pauseBtn) {
    pauseBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
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

/**
 * Binds a press-and-hold mobile button to a keyboard flag.
 * @param {*} buttonId
 * @param {*} keyName
 */
function bindHoldControl(buttonId, keyName) {
  const button = document.getElementById(buttonId);
  if (!button) return;

  const press = (event) => {
    event.preventDefault();
    event.stopPropagation();
    keyboard[keyName] = true;
  };

  const release = (event) => {
    event.preventDefault();
    event.stopPropagation();
    keyboard[keyName] = false;
  };

  button.addEventListener("pointerdown", press);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("pointerleave", release);
}
