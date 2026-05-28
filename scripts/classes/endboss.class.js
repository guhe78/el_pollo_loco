class Endboss extends Enemy {
  IMAGES_INTRO = [
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/1.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/2.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/3.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/4.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/5.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/6.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/7.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/8.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/9.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/10.png",
  ];
  IMAGES_SWIM = [
    "../../assets/img/Enemy/3 Final Enemy/2.floating/1.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/2.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/3.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/4.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/5.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/6.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/7.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/8.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/9.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/10.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/11.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/12.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/13.png",
  ];
  IMAGES_ATTACK = [
    "../../assets/img/Enemy/3 Final Enemy/Attack/1.png",
    "../../assets/img/Enemy/3 Final Enemy/Attack/2.png",
    "../../assets/img/Enemy/3 Final Enemy/Attack/3.png",
    "../../assets/img/Enemy/3 Final Enemy/Attack/4.png",
    "../../assets/img/Enemy/3 Final Enemy/Attack/5.png",
    "../../assets/img/Enemy/3 Final Enemy/Attack/6.png",
  ];
  IMAGES_DEAD = [
    "../../assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "../../assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "../../assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "../../assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "../../assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];
  path;
  position_x;
  position_y;
  startX;
  startY;
  width = 300;
  height = 250;
  rangeY = 55;
  speedY = 1.8;
  attackCooldown = 5000;
  attackSpeed = 10;
  returnSpeed = 6;
  retreatDistance = 120;
  movementState = "floating";
  attackStartedAt = Date.now();
  attackTargetX = null;
  retreatTargetX = null;
  attackRoarSound = new Audio("../../assets/audio/mooaarr.mp3");
  world;
  offset = {};

  /**
   * Creates the endboss with movement, animation and audio setup.
   * @param {*} position_x
   * @param {*} position_y
   */
  constructor(position_x, position_y) {
    super();
    this.setStartPosition(position_x, position_y);
    this.loadEndbossImages();
    this.offset = {
      top: 90,
      bottom: 20,
      right: 20,
      left: 20,
    };
    this.setInitialAnimation();
    this.moveUpAndDown();
    this.startAnimation(() => this.currentAnimation, 200);
  }

  /**
   * Sets initial coordinates and base sprite path.
   * @param {*} position_x
   * @param {*} position_y
   */
  setStartPosition(position_x, position_y) {
    this.path = this.IMAGES_SWIM[0];
    this.position_x = position_x;
    this.position_y = position_y;
    this.startX = position_x;
    this.startY = position_y;
  }

  /**
   * Preloads all endboss image sequences.
   */
  loadEndbossImages() {
    this.loadImage();
    this.loadImages(this.IMAGES_INTRO);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Sets initial animation state for the endboss.
   */
  setInitialAnimation() {
    this.currentAnimation = this.IMAGES_SWIM;
    this.image = this.imageCache[this.IMAGES_SWIM[0]];
  }

  /**
   * Starts the continuous movement update loop.
   */
  moveUpAndDown() {
    setInterval(() => {
      this.updateMovementState();
    }, 1000 / 60);
  }

  /**
   * Routes movement updates based on the current movement state.
   */
  updateMovementState() {
    if (this.shouldSkipMovement()) return;
    if (this.movementState === "floating") return this.handleFloatingMovement();
    if (this.movementState === "attacking") return this.handleAttackMovement();
    if (this.movementState === "returning") this.handleReturnMovement();
  }

  /**
   * Checks whether movement should currently be skipped.
   * @returns {*} Result value.
   */
  shouldSkipMovement() {
    return (
      !this.world ||
      this.world.gameState !== "running" ||
      this.isStunned ||
      !this.world.endbossIntroDone ||
      this.world.isEndbossIntroActive ||
      this.isDead()
    );
  }

  /**
   * Applies floating movement and transitions into attack phase.
   */
  handleFloatingMovement() {
    this.setAnimation(this.IMAGES_SWIM);
    this.position_y += this.speedY;
    this.clampVerticalMovement();

    if (this.isAttackReady()) {
      this.startAttackPhase();
    }
  }

  /**
   * Clamps vertical movement and reverses direction at bounds.
   */
  clampVerticalMovement() {
    const { minY, maxY } = this.getVerticalBounds();
    if (this.position_y < minY || this.position_y > maxY) {
      this.position_y = Math.max(minY, Math.min(maxY, this.position_y));
      this.speedY = -this.speedY;
    }
  }

  /**
   * Checks whether the attack cooldown has elapsed.
   * @returns {*} Result value.
   */
  isAttackReady() {
    return Date.now() - this.attackStartedAt >= this.attackCooldown;
  }

  /**
   * Starts attack movement phase and prepares attack targets.
   */
  startAttackPhase() {
    this.movementState = "attacking";
    this.attackTargetX = this.getAttackTargetX();
    this.retreatTargetX = this.getRetreatTargetX();
    this.setAnimation(this.IMAGES_ATTACK);
    this.playAttackRoar();
  }

  /**
   * Plays the endboss roar sound for attack start.
   */
  playAttackRoar() {
    this.attackRoarSound.currentTime = 0;
    this.attackRoarSound.muted = !this.world.soundEnabled;
    this.attackRoarSound.play();
  }

  /**
   * Moves endboss toward the attack target x-position.
   */
  handleAttackMovement() {
    this.position_x -= this.attackSpeed;
    if (this.position_x > this.attackTargetX) return;

    this.position_x = this.attackTargetX;
    this.movementState = "returning";
    this.setAnimation(this.IMAGES_SWIM);
  }

  /**
   * Moves endboss back to retreat position and resets state.
   */
  handleReturnMovement() {
    this.position_x += this.returnSpeed;
    if (this.position_x < this.retreatTargetX) return;

    this.position_x = this.retreatTargetX;
    this.startX = this.retreatTargetX;
    this.movementState = "floating";
    this.attackStartedAt = Date.now();
  }

  /**
   * Calculates horizontal attack target position.
   * @returns {*} Result value.
   */
  getAttackTargetX() {
    const section = this.getCurrentEndbossSection();
    if (!section) {
      return this.startX;
    }

    const leftVisibleX = this.getLeftVisibleX();
    return Math.max(section.startX, leftVisibleX);
  }

  /**
   * Calculates horizontal retreat target position.
   * @returns {*} Result value.
   */
  getRetreatTargetX() {
    const section = this.getCurrentEndbossSection();
    if (!section) {
      return this.startX;
    }

    const sectionRightLimit = section.endX - this.width;
    return Math.min(sectionRightLimit, this.startX + this.retreatDistance);
  }

  /**
   * Returns the current section if it contains this endboss.
   * @returns {*} Result value.
   */
  getCurrentEndbossSection() {
    if (!this.world || !this.world.currentSection) {
      return null;
    }

    const section = this.world.currentSection;
    if (section.endboss !== this) {
      return null;
    }

    return section;
  }

  /**
   * Returns vertical movement bounds for the endboss.
   * @returns {*} Result value.
   */
  getVerticalBounds() {
    if (!this.world || !this.world.canvas) {
      return {
        minY: this.startY - this.rangeY,
        maxY: this.startY + this.rangeY,
      };
    }

    const minY = 0;
    const maxY = this.world.canvas.height - this.height;
    return { minY, maxY };
  }

  /**
   * Returns current world x-position of the left camera edge.
   * @returns {*} Result value.
   */
  getLeftVisibleX() {
    if (!this.world) {
      return this.startX;
    }

    return -this.world.camera_x;
  }
}
