const displayModeKey = "displayMode";
const soundEnabledKey = "soundEnabled";

let canvas;
let world;
let keyboard = new Keyboard();
let menuClickHandler;
const KEY_BINDINGS = {
  Space: "SPACE",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  KeyD: "THROW",
};

/**
 * Initializes canvas, world and control systems.
 */
function loadCanvas() {
  canvas = document.getElementById("canvas");
  applyDisplayMode();
  world = new World(canvas, keyboard);
  applySoundMode();
  setupMenuControls();
  setupMobileControls();
}

/**
 * Wires keyboard events to the keyboard state and world activity registration.
 * Also toggles pause on Escape key.
 */
document.addEventListener("keydown", handleKeydown);

/**
 * Wires keyboard key releases to the keyboard state.
 * Also prevents default behavior for the keys used in the game to avoid unwanted scrolling, etc.
 */
document.addEventListener("keyup", handleKeyup);

/**
 * Handles keydown updates for keyboard state and pause toggle.
 * @param {*} event
 */
function handleKeydown(event) {
  world?.character?.registerActivity();

  if (event.code === "Escape") {
    world.togglePause();
    return;
  }

  updateKeyboardFromEvent(event.code, true);
}

/**
 * Handles keyup updates for keyboard state.
 * @param {*} event
 */
function handleKeyup(event) {
  updateKeyboardFromEvent(event.code, false);
}

/**
 * Maps browser key codes to game keyboard flags.
 * @param {*} code
 * @param {*} isPressed
 */
function updateKeyboardFromEvent(code, isPressed) {
  const keyName = KEY_BINDINGS[code];
  if (!keyName) return;
  keyboard[keyName] = isPressed;
}

/**
 * Wires menu buttons to their actions.
 */
function setupMenuControls() {
  const overlay = document.getElementById("game-overlay");
  if (!overlay) return;

  if (menuClickHandler) {
    overlay.removeEventListener("click", menuClickHandler);
  }

  menuClickHandler = (event) => {
    const button = event.target.closest("button[id]");
    if (!button || !overlay.contains(button)) return;

    const actions = {
      "settings-btn": () => world.showSettings(),
      "start-btn": () => {
        applyDisplayMode();
        world.startGame();
      },
      "resume-btn": () => world.startGame(),
      "restart-btn": () => world.restartGame(),
      "mainmenu-btn": () => world.abortGameToMenu(),
      "howto-btn": () => world.showHowTo(),
      "impressum-btn": () => world.showImpressum(),
      "back-btn": () => world.closeOverlayMenu(),
      "back-impressum-btn": () => world.closeOverlayMenu(),
      "display-toggle-btn": handleDisplayToggle,
      "sound-toggle-btn": handleSoundToggle,
      "back-settings-btn": () => world.closeOverlayMenu(),
    };

    const action = actions[button.id];
    if (!action) return;

    event.preventDefault();
    action();
  };

  overlay.addEventListener("click", menuClickHandler);
}

/**
 * Handles the display mode toggle action.
 */
function handleDisplayToggle() {
  if (!isMobileDevice()) {
    const nextMode = getDisplayMode() === "fullscreen" ? "standard" : "fullscreen";
    setDisplayMode(nextMode);
    applyDisplayMode();
  }

  world.setGameState("settings");
}

/**
 * Handles the sound toggle action.
 */
function handleSoundToggle() {
  setSoundEnabled(!getSoundEnabled());
  applySoundMode();
  world.setGameState("settings");
}

/**
 * Returns persisted display mode.
 * @returns {*} Result value.
 */
function getDisplayMode() {
  return localStorage.getItem(displayModeKey) || "standard";
}

/**
 * Persists selected display mode.
 * @param {*} mode
 */
function setDisplayMode(mode) {
  localStorage.setItem(displayModeKey, mode);
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
  document.body.classList.toggle("mode-fullscreen", isMobile || mode === "fullscreen");
}

/**
 * Returns persisted sound setting.
 * @returns {*} Result value.
 */
function getSoundEnabled() {
  return localStorage.getItem(soundEnabledKey) !== "false";
}

/**
 * Persists sound enabled state.
 * @param {*} enabled
 */
function setSoundEnabled(enabled) {
  localStorage.setItem(soundEnabledKey, String(enabled));
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
  preventMobileContextMenu();

  const pauseBtn = document.getElementById("mobile-pause-btn");
  if (pauseBtn) {
    pauseBtn.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

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

  button.addEventListener("contextmenu", preventDefault);
  button.addEventListener("pointerdown", createHoldHandler(keyName, true));
  button.addEventListener("pointerup", createHoldHandler(keyName, false));
  button.addEventListener("pointercancel", createHoldHandler(keyName, false));
  button.addEventListener("pointerleave", createHoldHandler(keyName, false));
}

/**
 * Creates a hold handler for a keyboard flag.
 * @param {*} keyName
 * @param {*} isPressed
 * @returns {*} Result value.
 */
function createHoldHandler(keyName, isPressed) {
  return (event) => {
    stopEvent(event);
    if (isPressed) {
      world?.character?.registerActivity();
    }
    setKeyboardState(keyName, isPressed);
  };
}

/**
 * Sets a keyboard flag.
 * @param {*} keyName
 * @param {*} value
 */
function setKeyboardState(keyName, value) {
  keyboard[keyName] = value;
}

/**
 * Prevents default behavior and stops bubbling.
 * @param {*} event
 */
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * Prevents default browser behavior.
 * @param {*} event
 */
function preventDefault(event) {
  event.preventDefault();
}

/**
 * Prevents native context menu on the mobile control overlay.
 */
function preventMobileContextMenu() {
  const controls = document.getElementById("mobile-controls");
  if (!controls) return;

  controls.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}
