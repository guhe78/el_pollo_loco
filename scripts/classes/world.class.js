class World {
  character = new Character();
  statusBars = [new LifeBar(), new PoisonBar(), new CoinBar()];
  endbossLifeBar = new EndbossLifeBar();
  throwableObjects = [];
  lastThrowAt = 0;
  level;
  currentSection = null;
  keyboard;
  camera_x = 0;
  gameState;
  isEndbossIntroActive = false;
  endbossIntroDone = false;
  menuReturnState = "startMenu";
  soundEnabled = true;
  splashSound = new Audio("../../assets/audio/splash.mp3");
  renderController;
  collisionController;
  endbossIntroController;
  stateController;

  /**
   * Creates an instance of World and initializes core systems.
   * @param {*} canvas
   * @param {*} keyboard
   */
  constructor(canvas, keyboard) {
    this.keyboard = keyboard;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.level = createLevel();
    this.currentSection = this.level.sections[0];
    this.overlayManager = new OverlayManager();
    this.renderController = new WorldRenderController(this);
    this.collisionController = new WorldCollisionController(this);
    this.endbossIntroController = new WorldEndbossIntroController(this);
    this.stateController = new WorldStateController(this);
    this.setWorld();
    this.setGameState("startMenu");
    this.draw();
    this.run();
  }

  /**
   * Draws one render frame and schedules the next frame.
   */
  draw() {
    this.renderController.drawFrame();
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Updates the active section only while game is running.
   */
  updateSectionIfRunning() {
    if (this.gameState === "running") {
      this.updateSection();
    }
  }

  /**
   * Draws all world-space elements with camera transform.
   */
  drawWorldLayer() {
    this.renderController.drawWorldLayer();
  }

  /**
   * Draws section backgrounds in proper layering order.
   */
  drawBackgrounds() {
    this.renderController.drawBackgrounds();
  }

  /**
   * Draws enemies, collectibles and endboss of current section.
   */
  drawCurrentSectionObjects() {
    this.renderController.drawCurrentSectionObjects();
  }

  /**
   * Draws character and active throwable objects.
   */
  drawForegroundObjects() {
    this.renderController.drawForegroundObjects();
  }

  /**
   * Draws HUD elements on screen-space.
   */
  drawHudLayer() {
    this.renderController.drawHudLayer();
  }

  /**
   * Starts active gameplay and hides overlays.
   */
  startGame() {
    this.stateController.startGame();
  }

  /**
   * Recreates world state for a fresh game run.
   */
  restartGame() {
    this.isEndbossIntroActive = false;
    this.endbossIntroDone = false;
    this.character.stop();
    this.camera_x = 0;
    this.level = createLevel();
    this.character = new Character();
    this.statusBars = [new LifeBar(), new PoisonBar(), new CoinBar()];
    this.endbossLifeBar = new EndbossLifeBar();
    this.throwableObjects = [];
    this.currentSection = this.level.sections[0];
    this.setWorld();
    this.setSoundEnabled(this.soundEnabled);
    this.startGame();
  }

  /**
   * Starts periodic gameplay checks.
   */
  run() {
    setInterval(() => {
      if (this.gameState !== "running") return;

      this.checkCollision();
      this.checkBubbleCollision();
      this.checkCollectItems();
    }, 200);
  }

  /**
   * Injects world reference into entities.
   */
  setWorld() {
    this.character.world = this;
    this.level.sections.forEach((section) => {
      section.enemies.forEach((enemy) => {
        enemy.world = this;
      });
      if (section.endboss) {
        section.endboss.world = this;
      }
    });
  }

  /**
   * Updates the currently active section by character position.
   */
  updateSection() {
    const x = this.character.position_x;
    const previousSection = this.currentSection;
    const lastSection = this.level.sections[this.level.sections.length - 1];
    this.level.sections.forEach((section) => {
      if (x >= section.startX && x < section.endX) {
        this.currentSection = section;
      }
    });
    if (x >= lastSection.startX) {
      this.currentSection = lastSection;
    }
    const enteredNewSection = previousSection !== this.currentSection;
    if (
      enteredNewSection &&
      this.currentSection.endboss &&
      !this.endbossIntroDone
    ) {
      this.startEndbossIntro();
    }
  }

  /**
   * Toggles between paused and running state.
   */
  togglePause() {
    this.stateController.togglePause();
  }

  /**
   * Returns to the start menu state.
   */
  startMenu() {
    this.stateController.startMenu();
  }

  /**
   * Triggers delayed game-over state.
   */
  gameOver() {
    this.stateController.gameOver();
  }

  /**
   * Handles victory transition and final victory state.
   */
  victory() {
    this.stateController.victory();
  }

  /**
   * Opens how-to overlay and stores return state.
   */
  showHowTo() {
    this.stateController.showHowTo();
  }

  /**
   * Opens settings overlay and stores return state.
   */
  showSettings() {
    this.stateController.showSettings();
  }

  /**
   * Closes current overlay and returns to previous menu state.
   */
  closeOverlayMenu() {
    this.stateController.closeOverlayMenu();
  }

  /**
   * Toggles managed audio objects according to sound mode.
   * @param {*} enabled
   */
  setSoundEnabled(enabled) {
    this.stateController.setSoundEnabled(enabled);
  }

  /**
   * Returns all sound instances controlled by world sound mode.
   * @returns {*} Result value.
   */
  getManagedSounds() {
    return this.stateController.getManagedSounds();
  }

  /**
   * Sets global game state and updates overlay visibility.
   * @param {*} state
   */
  setGameState(state) {
    this.stateController.setGameState(state);
  }

  /**
   * Checks whether a state should keep game layout active.
   * @param {*} state
   * @returns {*} Result value.
   */
  isGameScreenState(state) {
    return this.stateController.isGameScreenState(state);
  }

  /**
   * Checks whether overlays should be hidden for this state.
   * @param {*} state
   * @returns {*} Result value.
   */
  shouldHideOverlay(state) {
    return this.stateController.shouldHideOverlay(state);
  }

  /**
   * Renders overlay template for a given state.
   * @param {*} state
   */
  showOverlayForState(state) {
    this.stateController.showOverlayForState(state);
  }

  /**
   * Spawns a throwable bubble if the game is running.
   * @param {*} isFacingLeft
   */
  spawnBubble(isFacingLeft) {
    if (this.gameState !== "running") {
      return;
    }
    const direction = isFacingLeft ? -1 : 1;
    const startOffsetX = direction !== 1 ? 0 : 220;
    let bubble = new ThrowableObject(
      this.character.position_x + startOffsetX,
      this.character.position_y + 100,
      direction,
    );
    this.throwableObjects.push(bubble);
  }

  /**
   * Processes enemy and endboss collision checks.
   */
  checkCollision() {
    this.collisionController.checkCollision();
  }

  /**
   * Handles bubble collisions and bubble cleanup.
   */
  checkBubbleCollision() {
    this.collisionController.checkBubbleCollision();
  }

  /**
   * Handles collectible pickups and inventory bars.
   */
  checkCollectItems() {
    this.collisionController.checkCollectItems();
  }

  /**
   * Draws and updates the endboss life bar HUD.
   */
  drawEndbossLifeBar() {
    this.renderController.drawEndbossLifeBar();
  }

  /**
   * Starts the endboss intro camera and animation sequence.
   */
  startEndbossIntro() {
    this.endbossIntroController.startEndbossIntro();
  }

  /**
   * Draws all objects from an array to the canvas.
   * @param {*} array
   */
  drawArrayToMap(array) {
    this.renderController.drawArrayToMap(array);
  }

  /**
   * Draws a single object including direction flip and stun effect.
   * @param {*} object
   */
  addToMap(object) {
    this.renderController.addToMap(object);
  }

  /**
   * Flips render context for mirrored drawing.
   * @param {*} movableObject
   */
  flipImage(movableObject) {
    this.renderController.flipImage(movableObject);
  }

  /**
   * Restores render context after mirrored drawing.
   * @param {*} movableObject
   */
  flipImageBack(movableObject) {
    this.renderController.flipImageBack(movableObject);
  }
}
