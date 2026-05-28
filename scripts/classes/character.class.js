class Character extends MovableObject {
  IMAGES_IDLE = [
    "../../assets/img/Sharkie/1.IDLE/1.png",
    "../../assets/img/Sharkie/1.IDLE/2.png",
    "../../assets/img/Sharkie/1.IDLE/3.png",
    "../../assets/img/Sharkie/1.IDLE/4.png",
    "../../assets/img/Sharkie/1.IDLE/5.png",
    "../../assets/img/Sharkie/1.IDLE/6.png",
    "../../assets/img/Sharkie/1.IDLE/7.png",
    "../../assets/img/Sharkie/1.IDLE/8.png",
    "../../assets/img/Sharkie/1.IDLE/9.png",
    "../../assets/img/Sharkie/1.IDLE/10.png",
    "../../assets/img/Sharkie/1.IDLE/11.png",
    "../../assets/img/Sharkie/1.IDLE/12.png",
    "../../assets/img/Sharkie/1.IDLE/13.png",
    "../../assets/img/Sharkie/1.IDLE/14.png",
    "../../assets/img/Sharkie/1.IDLE/15.png",
    "../../assets/img/Sharkie/1.IDLE/16.png",
    "../../assets/img/Sharkie/1.IDLE/17.png",
    "../../assets/img/Sharkie/1.IDLE/18.png",
  ];
  IMAGES_SWIM = [
    "../../assets/img/Sharkie/3.Swim/1.png",
    "../../assets/img/Sharkie/3.Swim/2.png",
    "../../assets/img/Sharkie/3.Swim/3.png",
    "../../assets/img/Sharkie/3.Swim/4.png",
    "../../assets/img/Sharkie/3.Swim/5.png",
    "../../assets/img/Sharkie/3.Swim/6.png",
  ];
  IMAGES_ATTACK = [
    "../../assets/img/Sharkie/4.Attack/Fin slap/1.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/2.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/3.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/4.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/5.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/6.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/7.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/8.png",
  ];
  IMAGES_BUBBLE = [
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];
  IMAGES_HURT_ELECTRO = [
    "../../assets/img/Sharkie/5.Hurt/2.Electric shock/1.png",
    "../../assets/img/Sharkie/5.Hurt/2.Electric shock/2.png",
    "../../assets/img/Sharkie/5.Hurt/2.Electric shock/3.png",
  ];
  IMAGES_DEAD_ELECTRO = [
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/1.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/2.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/3.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/4.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/5.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/6.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/7.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/8.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/9.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/10.png",
  ];
  path = "../../assets/img/Sharkie/1.IDLE/1.png";
  position_x = 50;
  position_y = 150;
  width;
  height;
  world;
  speed = 10;
  attackDistance = 100;
  acceleration = 2.5;
  isAttacking = false;
  isThrowing = false;
  offset = {};
  endYUp = -90;
  endYDown = 320;
  animationSpeed = 100;
  cameraOffsetX = 100;
  cameraOffsetY = 100;
  edgeReachBottom = 45;
  edgeReachTop = 100;
  blubSound = new Audio("../../assets/audio/blubb.mp3");
  slapSound = new Audio("../../assets/audio/slap.mp3");
  auaSound = new Audio("../../assets/audio/aua.mp3");
  blingSound = new Audio("../../assets/audio/bling.mp3");
  hitSound = new Audio("../../assets/audio/hit.mp3");
  lastSlapStartedAt = 0;
  slapImpactDelayMs = 220;
  slapImpactReadyAt = 0;
  lastSlapSoundEndsAt = 0;
  slapSoundFallbackDurationMs = 450;
  highscore = 0;

  /**
   * Creates the player character and initializes animations and controls.
   */
  constructor() {
    super();
    this.width = 250;
    this.height = 200;
    this.offset = {
      top: 100,
      bottom: 40,
      right: 50,
      left: 50,
    };

    this.loadImage();
    this.loadCharacterImages();

    this.currentAnimation = this.IMAGES_IDLE;
    this.image = this.imageCache[this.IMAGES_IDLE[0]];

    this.movementControl();
    this.startAnimation(() => this.currentAnimation, 100);
  }

  /**
   * Preloads all image sequences used by the character states.
   */
  loadCharacterImages() {
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_BUBBLE);
    this.loadImages(this.IMAGES_HURT_ELECTRO);
    this.loadImages(this.IMAGES_DEAD_ELECTRO);
  }

  /**
   * Starts the movement update loop.
   */
  movementControl() {
    this.movementInterval = setInterval(() => {
      this.updateMovementFrame();
    }, 1000 / 60);
  }

  /**
   * Updates one movement frame including input, camera and animation.
   */
  updateMovementFrame() {
    if (!this.isMovementActive()) return;
    if (this.world.isEndbossIntroActive) return this.showIdleDuringIntro();

    const bounds = this.getMovementBounds();
    const isMoving = this.handleMovement(bounds);

    this.handleCombatActions();
    this.updateSectionCamera();
    this.changeAnimation(isMoving);
  }

  /**
   * Checks whether movement updates should currently run.
   * @returns {boolean} True when world exists and game is running.
   */
  isMovementActive() {
    return this.world && this.world.gameState === "running";
  }

  /**
   * Forces idle animation during endboss intro.
   */
  showIdleDuringIntro() {
    this.changeAnimation(false);
  }

  /**
   * Calculates vertical and horizontal movement bounds.
   * @returns {{minY:number,maxY:number,minX:number,maxX:number}} Movement limits.
   */
  getMovementBounds() {
    return {
      minY: -this.edgeReachTop,
      maxY: this.world.canvas.height - this.height + this.edgeReachBottom,
      ...this.getHorizontalBounds(),
    };
  }

  /**
   * Handles horizontal and vertical movement and returns if movement happened.
   * @param {{minY:number,maxY:number,minX:number,maxX:number}} bounds Movement limits.
   * @returns {boolean} True if the character moved in this frame.
   */
  handleMovement(bounds) {
    const movedX = this.handleHorizontalMovement(bounds);
    const movedY = this.handleVerticalMovement(bounds);
    return movedX || movedY;
  }

  /**
   * Applies horizontal movement according to input and section limits.
   * @param {{minX:number,maxX:number}} param0 Horizontal movement bounds.
   * @returns {boolean} True if character moved horizontally.
   */
  handleHorizontalMovement({ minX, maxX }) {
    if (!this.canMove()) return false;
    if (this.world.keyboard.RIGHT && this.position_x < maxX) {
      this.moveRight();
      return true;
    }
    if (this.world.keyboard.LEFT && this.position_x > minX) {
      this.moveLeft();
      return true;
    }
    return false;
  }

  /**
   * Applies vertical movement according to input and limits.
   * @param {{minY:number,maxY:number}} param0 Vertical movement bounds.
   * @returns {boolean} True if character moved vertically.
   */
  handleVerticalMovement({ minY, maxY }) {
    if (!this.canMove()) return false;
    if (this.world.keyboard.UP && this.position_y > minY) {
      this.position_y -= this.speed;
      return true;
    }
    if (this.world.keyboard.DOWN && this.position_y < maxY) {
      this.position_y += this.speed;
      return true;
    }
    return false;
  }

  /**
   * Handles slap and bubble attack inputs.
   */
  handleCombatActions() {
    if (this.world.keyboard.SPACE && this.canMove()) {
      this.applySlapAttack();
      this.world.keyboard.SPACE = false;
    }

    if (this.world.keyboard.THROW && !this.isThrowing && this.canMove()) {
      this.applyBubbleAttack();
    }
  }

  /**
   * Keeps camera clamped while the endboss fight is active.
   */
  updateSectionCamera() {
    if (this.isEndbossFightActive()) {
      this.clampCameraToCurrentSection();
    }
  }

  /**
   * Checks if the character is allowed to move.
   * @returns {boolean} True when not attacking and not dead.
   */
  canMove() {
    return !this.isAttacking && !this.isDead();
  }

  /**
   * Updates the displayed animation based on movement and state.
   * @param {boolean} isMoving Indicates whether the character moved this frame.
   */
  changeAnimation(isMoving) {
    this.setCurrentAnimation(isMoving);
  }

  /**
   * Selects the animation list for the current state.
   * @param {boolean} isMoving Indicates whether the character moved this frame.
   */
  setCurrentAnimation(isMoving) {
    if (this.isDead()) return this.setAnimation(this.IMAGES_DEAD_ELECTRO);
    if (this.isHurt()) return this.setAnimation(this.IMAGES_HURT_ELECTRO);
    if (this.isAttacking) return this.setAnimation(this.IMAGES_ATTACK);
    if (this.isThrowing) return this.setAnimation(this.IMAGES_BUBBLE);
    if (isMoving) return this.setAnimation(this.IMAGES_SWIM);

    this.setAnimation(this.IMAGES_IDLE);
  }

  /**
   * Updates swim sound state based on movement and damage state.
   * @param {boolean} isMoving Indicates whether the character moved this frame.
   */
  updateSwimSound(isMoving) {
    if (isMoving && !this.isHurt() && !this.isDead()) {
      this.playSwimSound();
      return;
    }

    this.stopSwimSound();
  }

  /**
   * Moves character to the right and updates camera.
   */
  moveRight() {
    this.otherDirection = false;
    const { maxX } = this.getHorizontalBounds();
    this.position_x = Math.min(this.position_x + this.speed, maxX);
    this.updateCameraPosition();
  }

  /**
   * Moves character to the left and updates camera.
   */
  moveLeft() {
    this.otherDirection = true;
    const { minX } = this.getHorizontalBounds();
    this.position_x = Math.max(this.position_x - this.speed, minX);
    this.updateCameraPosition();
  }

  /**
   * Checks whether the character is currently inside an active endboss fight.
   * @returns {boolean} True when section has this endboss and intro has finished.
   */
  isEndbossFightActive() {
    return Boolean(
      this.world?.currentSection?.endboss && this.world.endbossIntroDone,
    );
  }

  /**
   * Calculates allowed horizontal movement range for current section.
   * @returns {{minX:number,maxX:number}} Horizontal movement bounds.
   */
  getHorizontalBounds() {
    const defaultMaxX =
      this.world.level.levelEndX + this.cameraOffsetX - this.world.canvas.width;

    if (!this.isEndbossFightActive()) {
      return { minX: 0, maxX: defaultMaxX };
    }

    const section = this.world.currentSection;
    const minX = section.startX;
    const maxX = Math.max(minX, section.endX - this.width);

    return { minX, maxX };
  }

  /**
   * Updates camera position based on character position.
   */
  updateCameraPosition() {
    const targetCamera = Math.round(
      Math.min(0, -this.position_x + this.cameraOffsetX),
    );
    this.world.camera_x = targetCamera;

    if (this.isEndbossFightActive()) {
      this.clampCameraToCurrentSection();
    }
  }

  /**
   * Clamps camera to the current section limits.
   */
  clampCameraToCurrentSection() {
    const section = this.world.currentSection;
    if (!section) return;

    const minCameraX = Math.round(
      Math.min(0, -section.endX + this.world.canvas.width),
    );
    const maxCameraX = Math.round(Math.min(0, -section.startX));

    this.world.camera_x = Math.max(
      minCameraX,
      Math.min(maxCameraX, this.world.camera_x),
    );
  }

  /**
   * Starts the slap attack sequence.
   */
  applySlapAttack() {
    if (this.isAttacking) return;

    const attack = this.createSlapAttack();
    this.startSlapAttack(attack);
    this.finishSlapAttack(attack);
  }

  /**
   * Builds timing and movement data for a slap attack.
   * @returns {{startedAt:number,delta:number,animationDuration:number}} Attack data.
   */
  createSlapAttack() {
    const direction = this.otherDirection ? -1 : 1;
    return {
      startedAt: Date.now(),
      delta: this.attackDistance * direction,
      animationDuration: this.calculateAnimationDuration(this.IMAGES_ATTACK),
    };
  }

  /**
   * Applies immediate slap attack effects and plays slap sound.
   * @param {{startedAt:number,delta:number,animationDuration:number}} attack Attack data.
   */
  startSlapAttack(attack) {
    this.isAttacking = true;
    this.lastSlapStartedAt = attack.startedAt;
    this.slapImpactReadyAt = this.lastSlapStartedAt + this.slapImpactDelayMs;
    this.position_x += attack.delta;
    this.lastSlapSoundEndsAt =
      this.lastSlapStartedAt + this.getSlapSoundDurationMs();
    this.slapSound.currentTime = 0;
    this.slapSound.play();
  }

  /**
   * Ends slap attack after its animation time.
   * @param {{startedAt:number,delta:number,animationDuration:number}} attack Attack data.
   */
  finishSlapAttack(attack) {
    setTimeout(() => {
      this.position_x -= attack.delta;
      this.isAttacking = false;
    }, attack.animationDuration);
  }

  /**
   * Starts bubble throw animation and spawns the bubble at the end.
   */
  applyBubbleAttack() {
    this.isThrowing = true;
    const throwAnimationDuration = this.getBubbleThrowDuration();
    this.blubSound.play();

    setTimeout(() => {
      this.world.spawnBubble(this.otherDirection);
      this.isThrowing = false;
    }, throwAnimationDuration);
  }

  /**
   * Returns the duration of the bubble throw animation.
   * @returns {number} Duration in milliseconds.
   */
  getBubbleThrowDuration() {
    return this.calculateAnimationDuration(this.IMAGES_BUBBLE);
  }

  /**
   * Stops movement and animation intervals.
   */
  stop() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }

  /**
   * Calculates animation duration from frame count and animation speed.
   * @param {string[]} imageArray Image sequence used for the animation.
   * @returns {number} Duration in milliseconds.
   */
  calculateAnimationDuration(imageArray) {
    return imageArray.length * this.animationSpeed;
  }

  /**
   * Returns slap sound duration with a fallback when metadata is unavailable.
   * @returns {number} Duration in milliseconds.
   */
  getSlapSoundDurationMs() {
    const durationSeconds = this.slapSound?.duration;
    if (Number.isFinite(durationSeconds) && durationSeconds > 0) {
      return Math.round(durationSeconds * 1000);
    }

    return this.slapSoundFallbackDurationMs;
  }

  /**
   * Computes remaining time until slap sound playback should be finished.
   * @returns {number} Remaining delay in milliseconds.
   */
  getDelayUntilSlapSoundFinished() {
    return Math.max(0, (this.lastSlapSoundEndsAt || 0) - Date.now());
  }
}
