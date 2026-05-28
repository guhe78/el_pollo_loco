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
  movementController;
  combatController;

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

    this.movementController = new CharacterMovementController(this);
    this.combatController = new CharacterCombatController(this);
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

    const bounds = this.movementController.getMovementBounds();
    const isMoving = this.movementController.handleMovement(bounds);

    this.handleCombatActions();
    this.movementController.updateSectionCamera();
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
   * Handles slap and bubble attack inputs.
   */
  handleCombatActions() {
    if (this.world.keyboard.SPACE && this.canMove()) {
      this.combatController.applySlapAttack();
      this.world.keyboard.SPACE = false;
    }

    if (this.world.keyboard.THROW && !this.isThrowing && this.canMove()) {
      this.combatController.applyBubbleAttack();
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
   * Computes remaining time until slap sound playback should be finished.
   * @returns {number} Remaining delay in milliseconds.
   */
  getDelayUntilSlapSoundFinished() {
    return this.combatController.getDelayUntilSlapSoundFinished();
  }
}
