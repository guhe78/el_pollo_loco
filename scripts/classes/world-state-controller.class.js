class WorldStateController {
  /**
   * Creates state controller for World.
   * @param {*} world
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Starts active gameplay and hides overlays.
   */
  startGame() {
    const w = this.world;
    this.setGameState("running");
    w.overlayManager.hide();
  }

  /**
   * Toggles between paused and running state.
   */
  togglePause() {
    const w = this.world;
    if (w.gameState === "running") {
      this.setGameState("paused");
    } else if (w.gameState === "paused") {
      this.setGameState("running");
    }
  }

  /**
   * Returns to the start menu state.
   */
  startMenu() {
    this.setGameState("startMenu");
  }

  /**
   * Triggers delayed game-over state.
   */
  gameOver() {
    setTimeout(() => {
      this.setGameState("gameover");
    }, 3000);
  }

  /**
   * Handles victory transition and final victory state.
   */
  victory() {
    const w = this.world;
    this.setGameState("victoryTransition");
    setTimeout(() => {
      this.setGameState("victory");
    }, 5000);
  }

  /**
   * Opens how-to overlay and stores return state.
   */
  showHowTo() {
    const w = this.world;
    if (w.gameState === "paused" || w.gameState === "startMenu") {
      w.menuReturnState = w.gameState;
    }
    this.setGameState("howto");
  }

  /**
   * Opens settings overlay and stores return state.
   */
  showSettings() {
    const w = this.world;
    if (w.gameState === "paused" || w.gameState === "startMenu") {
      w.menuReturnState = w.gameState;
    }
    this.setGameState("settings");
  }

  /**
   * Closes current overlay and returns to previous menu state.
   */
  closeOverlayMenu() {
    const w = this.world;
    this.setGameState(w.menuReturnState);
  }

  /**
   * Toggles managed audio objects according to sound mode.
   * @param {*} enabled
   */
  setSoundEnabled(enabled) {
    const w = this.world;
    w.soundEnabled = enabled;
    this.getManagedSounds().forEach((audio) => {
      if (!audio) return;
      audio.muted = !enabled;
    });
    this.updateBackgroundMusicPlayback(w.gameState);
  }

  /**
   * Returns all sound instances controlled by world sound mode.
   * @returns {*} Result value.
   */
  getManagedSounds() {
    const w = this.world;
    return [
      w.character.blubSound,
      w.character.slapSound,
      w.character.auaSound,
      w.character.blingSound,
      w.character.hitSound,
      w.splashSound,
      w.backgroundMusic,
    ];
  }

  /**
   * Starts or pauses background music depending on game state.
   * @param {*} state
   */
  updateBackgroundMusicPlayback(state) {
    const w = this.world;
    const music = w.backgroundMusic;
    if (!music) return;

    const shouldPlay = w.soundEnabled && state === "running";
    if (shouldPlay) {
      if (music.paused) {
        const playPromise = music.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      }
      return;
    }

    music.pause();
  }

  /**
   * Sets global game state and updates overlay visibility.
   * @param {*} state
   */
  setGameState(state) {
    const w = this.world;
    w.gameState = state;
    this.updateBackgroundMusicPlayback(state);
    const isInGameState = this.isGameScreenState(state);
    document.body.classList.toggle("game-running", isInGameState);
    if (this.shouldHideOverlay(state)) {
      w.overlayManager.hide();
      return;
    }
    this.showOverlayForState(state);
  }

  /**
   * Checks whether a state should keep game layout active.
   * @param {*} state
   * @returns {*} Result value.
   */
  isGameScreenState(state) {
    return (
      state === "running" || state === "paused" || state === "victoryTransition"
    );
  }

  /**
   * Checks whether overlays should be hidden for this state.
   * @param {*} state
   * @returns {*} Result value.
   */
  shouldHideOverlay(state) {
    return state === "running";
  }

  /**
   * Renders overlay template for a given state.
   * @param {*} state
   */
  showOverlayForState(state) {
    const w = this.world;
    const template = states[state];
    w.overlayManager.show(typeof template === "function" ? template() : "");
  }
}
