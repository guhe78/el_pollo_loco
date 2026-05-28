class EndbossMovementController {
  /**
   * Creates movement controller for Endboss.
   * @param {*} endboss
   */
  constructor(endboss) {
    this.endboss = endboss;
  }

  /**
   * Routes movement updates based on current movement state.
   */
  updateMovementState() {
    if (this.shouldSkipMovement()) return;
    if (this.endboss.movementState === "floating")
      return this.handleFloatingMovement();
    if (this.endboss.movementState === "attacking")
      return this.handleAttackMovement();
    if (this.endboss.movementState === "returning") this.handleReturnMovement();
  }

  /**
   * Checks whether movement should currently be skipped.
   * @returns {*} Result value.
   */
  shouldSkipMovement() {
    const b = this.endboss;
    return (
      !b.world ||
      b.world.gameState !== "running" ||
      b.isStunned ||
      !b.world.endbossIntroDone ||
      b.world.isEndbossIntroActive ||
      b.isDead()
    );
  }

  /**
   * Applies floating movement and transitions into attack phase.
   */
  handleFloatingMovement() {
    const b = this.endboss;
    b.setAnimation(b.IMAGES_SWIM);
    b.position_y += b.speedY;
    this.clampVerticalMovement();

    if (this.isAttackReady()) {
      this.startAttackPhase();
    }
  }

  /**
   * Clamps vertical movement and reverses direction at bounds.
   */
  clampVerticalMovement() {
    const b = this.endboss;
    const { minY, maxY } = this.getVerticalBounds();
    if (b.position_y < minY || b.position_y > maxY) {
      b.position_y = Math.max(minY, Math.min(maxY, b.position_y));
      b.speedY = -b.speedY;
    }
  }

  /**
   * Checks whether attack cooldown has elapsed.
   * @returns {*} Result value.
   */
  isAttackReady() {
    const b = this.endboss;
    return Date.now() - b.attackStartedAt >= b.attackCooldown;
  }

  /**
   * Starts attack phase and prepares movement targets.
   */
  startAttackPhase() {
    const b = this.endboss;
    b.movementState = "attacking";
    b.attackTargetX = this.getAttackTargetX();
    b.retreatTargetX = this.getRetreatTargetX();
    b.setAnimation(b.IMAGES_ATTACK);
    this.playAttackRoar();
  }

  /**
   * Plays attack roar sound.
   */
  playAttackRoar() {
    const b = this.endboss;
    b.attackRoarSound.currentTime = 0;
    b.attackRoarSound.muted = !b.world.soundEnabled;
    b.attackRoarSound.play();
  }

  /**
   * Moves endboss toward attack target x-position.
   */
  handleAttackMovement() {
    const b = this.endboss;
    b.position_x -= b.attackSpeed;
    if (b.position_x > b.attackTargetX) return;

    b.position_x = b.attackTargetX;
    b.movementState = "returning";
    b.setAnimation(b.IMAGES_SWIM);
  }

  /**
   * Moves endboss back to retreat position and resets cycle.
   */
  handleReturnMovement() {
    const b = this.endboss;
    b.position_x += b.returnSpeed;
    if (b.position_x < b.retreatTargetX) return;

    b.position_x = b.retreatTargetX;
    b.startX = b.retreatTargetX;
    b.movementState = "floating";
    b.attackStartedAt = Date.now();
  }

  /**
   * Calculates horizontal attack target position.
   * @returns {*} Result value.
   */
  getAttackTargetX() {
    const b = this.endboss;
    const section = this.getCurrentEndbossSection();
    if (!section) {
      return b.startX;
    }

    const leftVisibleX = this.getLeftVisibleX();
    return Math.max(section.startX, leftVisibleX);
  }

  /**
   * Calculates horizontal retreat target position.
   * @returns {*} Result value.
   */
  getRetreatTargetX() {
    const b = this.endboss;
    const section = this.getCurrentEndbossSection();
    if (!section) {
      return b.startX;
    }

    const sectionRightLimit = section.endX - b.width;
    return Math.min(sectionRightLimit, b.startX + b.retreatDistance);
  }

  /**
   * Returns current section if it contains this endboss.
   * @returns {*} Result value.
   */
  getCurrentEndbossSection() {
    const b = this.endboss;
    if (!b.world || !b.world.currentSection) {
      return null;
    }

    const section = b.world.currentSection;
    if (section.endboss !== b) {
      return null;
    }

    return section;
  }

  /**
   * Returns vertical movement bounds for endboss movement.
   * @returns {*} Result value.
   */
  getVerticalBounds() {
    const b = this.endboss;
    if (!b.world || !b.world.canvas) {
      return {
        minY: b.startY - b.rangeY,
        maxY: b.startY + b.rangeY,
      };
    }

    const minY = 0;
    const maxY = b.world.canvas.height - b.height;
    return { minY, maxY };
  }

  /**
   * Returns current world x-position of the left camera edge.
   * @returns {*} Result value.
   */
  getLeftVisibleX() {
    const b = this.endboss;
    if (!b.world) {
      return b.startX;
    }

    return -b.world.camera_x;
  }
}
