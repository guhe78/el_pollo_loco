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
    this.setWorld();
    this.setGameState("startMenu");
    this.draw();
    this.run();
  }

  /**
   * Draws one render frame and schedules the next frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateSectionIfRunning();
    this.drawWorldLayer();
    this.drawHudLayer();
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
    this.ctx.translate(this.camera_x, 0);
    this.drawBackgrounds();
    this.drawCurrentSectionObjects();
    this.drawForegroundObjects();
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws section backgrounds in proper layering order.
   */
  drawBackgrounds() {
    this.level.sections.forEach((section) => {
      this.drawArrayToMap(
        section.backgrounds.filter((b) => !(b instanceof Barrier)),
      );
    });
    this.level.sections.forEach((section) => {
      this.drawArrayToMap(
        section.backgrounds.filter((b) => b instanceof Barrier),
      );
    });
  }

  /**
   * Draws enemies, collectibles and endboss of current section.
   */
  drawCurrentSectionObjects() {
    this.drawArrayToMap(this.currentSection.enemies);
    this.drawArrayToMap(this.currentSection.collectibles);
    if (this.currentSection.endboss) {
      this.addToMap(this.currentSection.endboss);
    }
  }

  /**
   * Draws character and active throwable objects.
   */
  drawForegroundObjects() {
    this.addToMap(this.character);
    this.drawArrayToMap(this.throwableObjects);
  }

  /**
   * Draws HUD elements on screen-space.
   */
  drawHudLayer() {
    this.drawArrayToMap(this.statusBars);
    this.drawEndbossLifeBar();
  }

  /**
   * Starts active gameplay and hides overlays.
   */
  startGame() {
    this.setGameState("running");
    this.overlayManager.hide();
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
    if (this.gameState === "running") {
      this.setGameState("paused");
    } else if (this.gameState === "paused") {
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
    this.character.isAttacking = false;
    this.character.isThrowing = false;
    this.character.setAnimation(this.character.IMAGES_IDLE);
    this.setGameState("victoryTransition");
    setTimeout(() => {
      this.setGameState("victory");
    }, 3000);
  }

  /**
   * Opens how-to overlay and stores return state.
   */
  showHowTo() {
    if (this.gameState === "paused" || this.gameState === "startMenu") {
      this.menuReturnState = this.gameState;
    }
    this.setGameState("howto");
  }

  /**
   * Opens settings overlay and stores return state.
   */
  showSettings() {
    if (this.gameState === "paused" || this.gameState === "startMenu") {
      this.menuReturnState = this.gameState;
    }
    this.setGameState("settings");
  }

  /**
   * Closes current overlay and returns to previous menu state.
   */
  closeOverlayMenu() {
    this.setGameState(this.menuReturnState);
  }

  /**
   * Toggles managed audio objects according to sound mode.
   * @param {*} enabled
   */
  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
    this.getManagedSounds().forEach((audio) => {
      if (!audio) return;
      audio.muted = !enabled;
    });
  }

  /**
   * Returns all sound instances controlled by world sound mode.
   * @returns {*} Result value.
   */
  getManagedSounds() {
    return [
      this.character.blubSound,
      this.character.slapSound,
      this.character.auaSound,
      this.character.blingSound,
      this.character.hitSound,
      this.splashSound,
    ];
  }

  /**
   * Sets global game state and updates overlay visibility.
   * @param {*} state
   */
  setGameState(state) {
    this.gameState = state;
    const isInGameState = this.isGameScreenState(state);
    document.body.classList.toggle("game-running", isInGameState);
    if (this.shouldHideOverlay(state)) {
      this.overlayManager.hide();
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
    return state === "running" || state === "victoryTransition";
  }

  /**
   * Renders overlay template for a given state.
   * @param {*} state
   */
  showOverlayForState(state) {
    const template = states[state];
    this.overlayManager.show(typeof template === "function" ? template() : "");
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
    this.currentSection.enemies.forEach((enemy) => {
      this.handleEnemyCollision(enemy);
      enemy?.changeAnimation(enemy.randomImagesSwimArray);
    });

    this.handleEndbossCollision();
    this.currentSection.enemies = this.currentSection.enemies.filter(
      (enemy) => !enemy.shouldBeRemoved(),
    );
  }

  /**
   * Handles character collision interaction with one enemy.
   * @param {*} enemy
   */
  handleEnemyCollision(enemy) {
    if (!enemy || enemy.isPendingSlapKill) return;
    if (!this.character.isColliding(enemy)) return;
    if (this.character.isAttacking && enemy.isStunned) {
      this.handleEnemySlapKill(enemy);
      return;
    }
    if (!this.character.isAttacking && !enemy.isStunned) {
      this.applyCharacterDamage();
    }
  }

  /**
   * Handles character collision interaction with endboss.
   */
  handleEndbossCollision() {
    const endboss = this.currentSection.endboss;
    if (!endboss || endboss.isDead()) return;
    if (!this.character.isColliding(endboss)) return;
    if (this.character.isAttacking && endboss.isStunned) {
      this.handleEndbossSlapHit(endboss);
      return;
    }
    if (!this.character.isAttacking && !endboss.isStunned) {
      this.applyCharacterDamage();
    }
  }

  /**
   * Applies damage to character and updates life UI.
   */
  applyCharacterDamage() {
    this.character.auaSound.play();
    this.character.hit(5);
    this.statusBars[0].setLifePercentage(this.character.energy);
    if (this.character.isDead()) {
      this.gameOver();
    }
  }

  /**
   * Resolves slap kill logic for normal enemies.
   * @param {*} enemy
   */
  handleEnemySlapKill(enemy) {
    if (
      enemy.isPendingSlapKill ||
      enemy.isDead() ||
      enemy.removeStartedAt !== null
    )
      return;
    enemy.isPendingSlapKill = true;
    enemy.energy = 0;
    enemy.startDeath(enemy.randomImagesDieArray);
    this.character.highscore += 10;
    this.playHitSoundAfterSlap();
    enemy.isPendingSlapKill = false;
  }

  /**
   * Resolves slap hit logic for the endboss.
   * @param {*} endboss
   */
  handleEndbossSlapHit(endboss) {
    if (endboss.isPendingSlapHit || endboss.isDead()) return;
    endboss.isPendingSlapHit = true;
    endboss.hit(10);
    this.playHitSoundAfterSlap();
    if (endboss.isDead()) {
      endboss.startDeath(endboss.IMAGES_DEAD);
      this.character.highscore += 100;
      this.victory();
    }
    const attackDuration = this.character.calculateAnimationDuration(
      this.character.IMAGES_ATTACK,
    );
    setTimeout(() => {
      endboss.isPendingSlapHit = false;
    }, attackDuration);
  }

  /**
   * Plays hit sound delayed until slap sound is complete.
   */
  playHitSoundAfterSlap() {
    const delay = this.character.getDelayUntilSlapSoundFinished();
    setTimeout(() => {
      this.character.hitSound.currentTime = 0;
      this.character.hitSound.play();
    }, delay);
  }

  /**
   * Handles bubble collisions and bubble cleanup.
   */
  checkBubbleCollision() {
    const leftEdge = -this.camera_x;
    const rightEdge = -this.camera_x + this.canvas.width;
    this.throwableObjects.forEach((object) => {
      this.handleBubbleEnemyCollision(object);
      if (this.handleBubbleEndbossCollision(object)) return;
      if (this.isBubbleOutsideView(object, leftEdge, rightEdge)) {
        object.startRemove();
      }
    });
    this.throwableObjects = this.throwableObjects.filter(
      (object) => !object.shouldBeRemoved(),
    );
  }

  /**
   * Applies bubble stun collision against enemies.
   * @param {*} object
   */
  handleBubbleEnemyCollision(object) {
    this.currentSection.enemies.forEach((enemy) => {
      if (enemy.isColliding(object)) {
        enemy.stun();
        object.startRemove();
      }
    });
  }

  /**
   * Applies bubble collision logic against endboss.
   * @param {*} object
   * @returns {*} Result value.
   */
  handleBubbleEndbossCollision(object) {
    const endboss = this.currentSection.endboss;
    if (!endboss || endboss.isDead() || !endboss.isColliding(object)) {
      return false;
    }
    object.startRemove();
    endboss.stun();
    if (endboss.isDead()) {
      endboss.startDeath(endboss.IMAGES_DEAD);
      this.victory();
    }
    return true;
  }

  /**
   * Checks if a bubble is outside current visible area.
   * @param {*} object
   * @param {*} leftEdge
   * @param {*} rightEdge
   * @returns {*} Result value.
   */
  isBubbleOutsideView(object, leftEdge, rightEdge) {
    return (
      object.position_y < 0 ||
      object.position_x + object.width < leftEdge ||
      object.position_x + object.width > rightEdge
    );
  }

  /**
   * Handles collectible pickups and inventory bars.
   */
  checkCollectItems() {
    this.currentSection.collectibles.forEach((item) => {
      if (this.character.isColliding(item)) {
        if (item instanceof Coins) {
          item.isCollected = true;
          this.statusBars[2].setCoinPercentage(20);
        } else if (item instanceof Poison) {
          item.isCollected = true;
          this.statusBars[1].setPoisonPercentage(20);
        }
        this.character.highscore += 5;
        this.character.blingSound.play();
      }
    });
    this.currentSection.collectibles = this.currentSection.collectibles.filter(
      (item) => !item.isCollected,
    );
  }

  /**
   * Draws and updates the endboss life bar HUD.
   */
  drawEndbossLifeBar() {
    const endboss = this.currentSection?.endboss;
    if (!endboss || this.gameState !== "running") return;

    const characterLifeBar = this.statusBars[0];
    this.endbossLifeBar.setLifePercentage(endboss.energy);
    this.endbossLifeBar.position_y = characterLifeBar.position_y;
    this.endbossLifeBar.setPositionX(
      this.canvas.width - 10 - this.endbossLifeBar.width,
    );
    this.addToMap(this.endbossLifeBar);
  }

  /**
   * Starts the endboss intro camera and animation sequence.
   */
  startEndbossIntro() {
    const endboss = this.currentSection.endboss;
    if (!endboss) return;
    this.endbossIntroDone = true;
    this.isEndbossIntroActive = true;
    const introState = this.createEndbossIntroState(endboss);
    this.prepareEndbossIntro(endboss);
    this.panCameraToEndboss(endboss, introState);
  }

  /**
   * Creates shared state values for intro sequence.
   * @param {*} endboss
   * @returns {*} Result value.
   */
  createEndbossIntroState(endboss) {
    return {
      targetY: endboss.position_y,
      introDiveY: Math.max(0, endboss.position_y - 70),
      holdBeforePanMs: 900,
      ...this.getEndbossIntroCameraTargets(endboss),
    };
  }

  /**
   * Computes camera targets for intro pan transitions.
   * @param {*} endboss
   * @returns {*} Result value.
   */
  getEndbossIntroCameraTargets(endboss) {
    const levelMinCameraX = Math.round(
      Math.min(0, -this.level.levelEndX + this.canvas.width),
    );
    const sectionMinCameraX = Math.round(
      Math.min(0, -this.currentSection.endX + this.canvas.width),
    );
    const sectionMaxCameraX = Math.round(
      Math.min(0, -this.currentSection.startX),
    );
    const rawEndbossCameraX = Math.round(
      Math.min(
        0,
        -endboss.position_x + this.canvas.width / 2 - endboss.width / 2,
      ),
    );
    const rawCharacterCameraX = Math.round(
      Math.min(0, -this.character.position_x + this.character.cameraOffsetX),
    );

    return {
      endbossCameraX: Math.max(levelMinCameraX, rawEndbossCameraX),
      characterCameraX: Math.max(
        sectionMinCameraX,
        Math.min(sectionMaxCameraX, rawCharacterCameraX),
      ),
    };
  }

  /**
   * Initializes endboss intro animation state.
   * @param {*} endboss
   */
  prepareEndbossIntro(endboss) {
    if (endboss.animationInterval) {
      clearInterval(endboss.animationInterval);
      endboss.animationInterval = null;
    }
    endboss.currentAnimation = endboss.IMAGES_INTRO;
    endboss.currentImage = 0;
    endboss.position_y = -endboss.height;
    this.setEndbossIntroFrame(endboss, 0);
  }

  /**
   * Sets one frame from the endboss intro sprite sequence.
   * @param {*} endboss
   * @param {*} index
   */
  setEndbossIntroFrame(endboss, index) {
    const frameIndex = Math.max(
      0,
      Math.min(index, endboss.IMAGES_INTRO.length - 1),
    );
    endboss.currentImage = frameIndex;
    endboss.image = endboss.imageCache[endboss.IMAGES_INTRO[frameIndex]];
  }

  /**
   * Pans camera from character to endboss before dive starts.
   * @param {*} endboss
   * @param {*} introState
   */
  panCameraToEndboss(endboss, introState) {
    const panToEndboss = setInterval(() => {
      this.setEndbossIntroFrame(endboss, 0);
      const diff = introState.endbossCameraX - this.camera_x;
      if (Math.abs(diff) >= 5) {
        this.camera_x += diff * 0.04;
        return;
      }
      this.camera_x = introState.endbossCameraX;
      clearInterval(panToEndboss);
      this.playIntroSplash();
      this.startEndbossDive(endboss, introState);
    }, 1000 / 60);
  }

  /**
   * Plays splash sound used at intro dive start.
   */
  playIntroSplash() {
    this.splashSound.currentTime = 0;
    this.splashSound.play();
  }

  /**
   * Runs downward intro dive animation for endboss.
   * @param {*} endboss
   * @param {*} introState
   */
  startEndbossDive(endboss, introState) {
    const introFall = setInterval(() => {
      endboss.position_y += 8;
      this.updateEndbossDiveFrame(endboss, introState.introDiveY);
      if (endboss.position_y < introState.introDiveY) return;
      endboss.position_y = introState.introDiveY;
      this.setEndbossIntroFrame(endboss, endboss.IMAGES_INTRO.length - 1);
      clearInterval(introFall);
      this.swimEndbossToStartPosition(endboss, introState);
    }, 1000 / 60);
  }

  /**
   * Updates intro animation frame during endboss dive.
   * @param {*} endboss
   * @param {*} introDiveY
   */
  updateEndbossDiveFrame(endboss, introDiveY) {
    const fallProgress =
      (endboss.position_y + endboss.height) / (introDiveY + endboss.height);
    const introFrameIndex = Math.floor(
      Math.max(0, Math.min(1, fallProgress)) *
        (endboss.IMAGES_INTRO.length - 1),
    );
    this.setEndbossIntroFrame(endboss, introFrameIndex);
  }

  /**
   * Moves endboss from dive position back to its start Y.
   * @param {*} endboss
   * @param {*} introState
   */
  swimEndbossToStartPosition(endboss, introState) {
    const swimToStart = setInterval(() => {
      this.setEndbossIntroFrame(endboss, endboss.IMAGES_INTRO.length - 1);
      const deltaY = introState.targetY - endboss.position_y;
      if (Math.abs(deltaY) >= 0.8) {
        endboss.position_y += deltaY * 0.12;
        return;
      }
      endboss.position_y = introState.targetY;
      clearInterval(swimToStart);
      setTimeout(() => {
        this.panCameraBackToCharacter(endboss, introState.characterCameraX);
      }, introState.holdBeforePanMs);
    }, 1000 / 60);
  }

  /**
   * Pans camera back to character and finishes intro.
   * @param {*} endboss
   * @param {*} characterCameraX
   */
  panCameraBackToCharacter(endboss, characterCameraX) {
    const panToCharacter = setInterval(() => {
      this.setEndbossIntroFrame(endboss, endboss.IMAGES_INTRO.length - 1);
      const diff = characterCameraX - this.camera_x;
      if (Math.abs(diff) >= 2) {
        this.camera_x += diff * 0.02;
        return;
      }
      this.camera_x = characterCameraX;
      clearInterval(panToCharacter);
      this.finishEndbossIntro(endboss);
    }, 1000 / 60);
  }

  /**
   * Restores endboss swim animation after intro completes.
   * @param {*} endboss
   */
  finishEndbossIntro(endboss) {
    endboss.setAnimation(endboss.IMAGES_SWIM);
    endboss.startAnimation(() => endboss.currentAnimation, 200);
    this.isEndbossIntroActive = false;
  }

  /**
   * Draws all objects from an array to the canvas.
   * @param {*} array
   */
  drawArrayToMap(array) {
    array.forEach((element) => {
      this.addToMap(element);
    });
  }

  /**
   * Draws a single object including direction flip and stun effect.
   * @param {*} object
   */
  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }
    if (object.isStunned) {
      this.ctx.globalAlpha = Math.sin(Date.now() / 100) > 0 ? 1 : 0.5;
    }
    object.draw(this.ctx);
    this.ctx.globalAlpha = 1;
    this.ctx.stroke();
    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  /**
   * Flips render context for mirrored drawing.
   * @param {*} movableObject
   */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.position_x *= -1;
  }

  /**
   * Restores render context after mirrored drawing.
   * @param {*} movableObject
   */
  flipImageBack(movableObject) {
    movableObject.position_x *= -1;
    this.ctx.restore();
  }
}
