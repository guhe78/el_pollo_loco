class CharacterMovementController {
  /**
   * Creates a movement and camera controller for Character.
   * @param {*} character
   */
  constructor(character) {
    this.character = character;
  }

  /**
   * Calculates vertical and horizontal movement bounds.
   * @returns {*} Result value.
   */
  getMovementBounds() {
    const c = this.character;
    return {
      minY: -c.edgeReachTop,
      maxY: c.world.canvas.height - c.height + c.edgeReachBottom,
      ...this.getHorizontalBounds(),
    };
  }

  /**
   * Handles movement on both axes and returns whether movement happened.
   * @param {*} bounds
   * @returns {*} Result value.
   */
  handleMovement(bounds) {
    const movedX = this.handleHorizontalMovement(bounds);
    const movedY = this.handleVerticalMovement(bounds);
    return movedX || movedY;
  }

  /**
   * Handles horizontal movement from keyboard input.
   * @param {*} param0
   * @returns {*} Result value.
   */
  handleHorizontalMovement({ minX, maxX }) {
    const c = this.character;
    if (!c.canMove()) return false;

    if (c.world.keyboard.RIGHT && c.position_x < maxX) {
      this.moveRight();
      return true;
    }

    if (c.world.keyboard.LEFT && c.position_x > minX) {
      this.moveLeft();
      return true;
    }

    return false;
  }

  /**
   * Handles vertical movement from keyboard input.
   * @param {*} param0
   * @returns {*} Result value.
   */
  handleVerticalMovement({ minY, maxY }) {
    const c = this.character;
    if (!c.canMove()) return false;

    if (c.world.keyboard.UP && c.position_y > minY) {
      c.position_y -= c.speed;
      return true;
    }

    if (c.world.keyboard.DOWN && c.position_y < maxY) {
      c.position_y += c.speed;
      return true;
    }

    return false;
  }

  /**
   * Moves character right and updates camera.
   */
  moveRight() {
    const c = this.character;
    c.otherDirection = false;
    const { maxX } = this.getHorizontalBounds();
    c.position_x = Math.min(c.position_x + c.speed, maxX);
    this.updateCameraPosition();
  }

  /**
   * Moves character left and updates camera.
   */
  moveLeft() {
    const c = this.character;
    c.otherDirection = true;
    const { minX } = this.getHorizontalBounds();
    c.position_x = Math.max(c.position_x - c.speed, minX);
    this.updateCameraPosition();
  }

  /**
   * Checks whether endboss fight movement rules are active.
   * @returns {*} Result value.
   */
  isEndbossFightActive() {
    const c = this.character;
    return Boolean(c.world?.currentSection?.endboss && c.world.endbossIntroDone);
  }

  /**
   * Calculates allowed horizontal bounds for current context.
   * @returns {*} Result value.
   */
  getHorizontalBounds() {
    const c = this.character;
    const defaultMaxX = c.world.level.levelEndX + c.cameraOffsetX - c.world.canvas.width;

    if (!this.isEndbossFightActive()) {
      return { minX: 0, maxX: defaultMaxX };
    }

    const section = c.world.currentSection;
    const minX = section.startX;
    const maxX = Math.max(minX, section.endX - c.width);
    return { minX, maxX };
  }

  /**
   * Updates camera x-position based on character position.
   */
  updateCameraPosition() {
    const c = this.character;
    const targetCamera = Math.round(Math.min(0, -c.position_x + c.cameraOffsetX));
    c.world.camera_x = targetCamera;

    if (this.isEndbossFightActive()) {
      this.clampCameraToCurrentSection();
    }
  }

  /**
   * Clamps camera to current section boundaries.
   */
  clampCameraToCurrentSection() {
    const c = this.character;
    const section = c.world.currentSection;
    if (!section) return;

    const minCameraX = Math.round(Math.min(0, -section.endX + c.world.canvas.width));
    const maxCameraX = Math.round(Math.min(0, -section.startX));

    c.world.camera_x = Math.max(minCameraX, Math.min(maxCameraX, c.world.camera_x));
  }

  /**
   * Applies section camera clamp when endboss fight is active.
   */
  updateSectionCamera() {
    if (this.isEndbossFightActive()) {
      this.clampCameraToCurrentSection();
    }
  }
}
