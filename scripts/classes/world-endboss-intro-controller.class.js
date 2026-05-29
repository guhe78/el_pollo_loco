class WorldEndbossIntroController {
  /**
   * Creates intro controller for World endboss sequence.
   * @param {*} world
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Starts the complete endboss intro sequence.
   */
  startEndbossIntro() {
    const w = this.world;
    const endboss = w.currentSection.endboss;
    if (!endboss) return;

    w.endbossIntroDone = true;
    w.isEndbossIntroActive = true;
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
    const { world } = this;
    const capAtZero = (value) => Math.round(Math.min(0, value));
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const levelMinCameraX = capAtZero(-world.level.levelEndX + world.canvas.width);
    const sectionMinCameraX = capAtZero(-world.currentSection.endX + world.canvas.width);
    const sectionMaxCameraX = capAtZero(-world.currentSection.startX);
    const rawEndbossCameraX = capAtZero(
      -endboss.position_x + world.canvas.width / 2 - endboss.width / 2,
    );
    const rawCharacterCameraX = capAtZero(
      -world.character.position_x + world.character.cameraOffsetX,
    );

    return {
      endbossCameraX: Math.max(levelMinCameraX, rawEndbossCameraX),
      characterCameraX: clamp(rawCharacterCameraX, sectionMinCameraX, sectionMaxCameraX),
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
    const frameIndex = Math.max(0, Math.min(index, endboss.IMAGES_INTRO.length - 1));
    endboss.currentImage = frameIndex;
    endboss.image = endboss.imageCache[endboss.IMAGES_INTRO[frameIndex]];
  }

  /**
   * Pans camera from character to endboss before dive starts.
   * @param {*} endboss
   * @param {*} introState
   */
  panCameraToEndboss(endboss, introState) {
    const w = this.world;
    const panToEndboss = setInterval(() => {
      this.setEndbossIntroFrame(endboss, 0);
      const diff = introState.endbossCameraX - w.camera_x;
      if (Math.abs(diff) >= 5) {
        w.camera_x += diff * 0.04;
        return;
      }
      w.camera_x = introState.endbossCameraX;
      clearInterval(panToEndboss);
      this.playIntroSplash();
      this.startEndbossDive(endboss, introState);
    }, 1000 / 60);
  }

  /**
   * Plays splash sound used at intro dive start.
   */
  playIntroSplash() {
    const w = this.world;
    w.splashSound.currentTime = 0;
    w.splashSound.play();
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
    const fallProgress = (endboss.position_y + endboss.height) / (introDiveY + endboss.height);
    const introFrameIndex = Math.floor(
      Math.max(0, Math.min(1, fallProgress)) * (endboss.IMAGES_INTRO.length - 1),
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
    const w = this.world;
    const panToCharacter = setInterval(() => {
      this.setEndbossIntroFrame(endboss, endboss.IMAGES_INTRO.length - 1);
      const diff = characterCameraX - w.camera_x;
      if (Math.abs(diff) >= 2) {
        w.camera_x += diff * 0.02;
        return;
      }
      w.camera_x = characterCameraX;
      clearInterval(panToCharacter);
      this.finishEndbossIntro(endboss);
    }, 1000 / 60);
  }

  /**
   * Restores endboss swim animation after intro completes.
   * @param {*} endboss
   */
  finishEndbossIntro(endboss) {
    const w = this.world;
    endboss.setAnimation(endboss.IMAGES_SWIM);
    endboss.startAnimation(() => endboss.currentAnimation, 200);
    w.isEndbossIntroActive = false;
  }
}
