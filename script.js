/**
 * Initializes the game bootstrap flow.
 */
function init() {
  loadCanvas();
}

/**
 * Resumes gameplay from pause state.
 */
function continueGame() {
  world.togglePause();
}

/**
 * Restarts the game by re-running initialization.
 */
function restartGame() {
  init();
}

/**
 * Leaves the current run and returns to start menu.
 */
function quitGame() {
  world.startMenu();
}

/**
 * Opens the start menu.
 */
function startMenu() {
  world.startMenu();
}
