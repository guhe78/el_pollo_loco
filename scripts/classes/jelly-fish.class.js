class JellyFish extends Enemy {
  IMAGES_SWIM = [
    [
      "assets/img/Enemy/2 Jelly fish/Regular damage/Lila 1.png",
      "assets/img/Enemy/2 Jelly fish/Regular damage/Lila 2.png",
      "assets/img/Enemy/2 Jelly fish/Regular damage/Lila 3.png",
      "assets/img/Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    ],
    [
      "assets/img/Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
      "assets/img/Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
      "assets/img/Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
      "assets/img/Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
    ],
  ];
  IMAGES_DIE = [
    [
      "assets/img/Enemy/2 Jelly fish/Dead/Lila/L1.png",
      "assets/img/Enemy/2 Jelly fish/Dead/Lila/L2.png",
      "assets/img/Enemy/2 Jelly fish/Dead/Lila/L3.png",
      "assets/img/Enemy/2 Jelly fish/Dead/Lila/L4.png",
    ],
    [
      "assets/img/Enemy/2 Jelly fish/Dead/Yellow/y1.png",
      "assets/img/Enemy/2 Jelly fish/Dead/Yellow/y2.png",
      "assets/img/Enemy/2 Jelly fish/Dead/Yellow/y3.png",
      "assets/img/Enemy/2 Jelly fish/Dead/Yellow/y4.png",
    ],
  ];
  path;
  position_x;
  position_y;
  width = 150;
  height = 100;
  randomElement = parseInt(Math.random() * this.IMAGES_SWIM.length);
  randomImagesSwimArray = this.IMAGES_SWIM[this.randomElement];
  randomImagesDieArray = this.IMAGES_DIE[this.randomElement];
  offset = {};
  startX;
  startY;
  speedX = 2;
  speedY = 2;
  rangeX = 80;
  rangeY = 80;

  /**
   * Creates a jelly fish enemy with randomized movement direction.
   * @param {*} position_x
   * @param {*} position_y
   */
  constructor(position_x, position_y) {
    super();
    this.setStartPosition(position_x, position_y);
    this.setMovementDirection();
    this.offset = {
      top: 5,
      bottom: 25,
      right: 25,
      left: 25,
    };
    this.loadImage();
    this.loadEnemyImages();
    this.moveInXPattern();
    this.setInitialAnimation();

    this.startAnimation(() => this.currentAnimation, 200);
  }

  /**
   * Sets initial position and sprite path.
   * @param {*} position_x
   * @param {*} position_y
   */
  setStartPosition(position_x, position_y) {
    this.path = this.IMAGES_SWIM[this.randomElement][0];
    this.position_x = position_x;
    this.position_y = position_y;
    this.startX = position_x;
    this.startY = position_y;
  }

  /**
   * Randomizes horizontal and vertical movement direction.
   */
  setMovementDirection() {
    this.speedX = Math.random() > 0.5 ? 2 : -2;
    this.speedY = Math.random() > 0.5 ? 2 : -2;
  }

  /**
   * Sets initial animation frame for the selected jelly fish variant.
   */
  setInitialAnimation() {
    this.currentAnimation = this.randomImagesSwimArray;
    this.image = this.imageCache[this.randomImagesSwimArray[0]];
  }

  /**
   * Preloads swim and death sprites for this jelly fish variant.
   */
  loadEnemyImages() {
    this.loadImages(this.randomImagesSwimArray);
    this.loadImages(this.randomImagesDieArray);
  }

  /**
   * Starts the continuous movement update interval.
   */
  moveInXPattern() {
    setInterval(() => {
      this.updateMovementPattern();
    }, 1000 / 60);
  }

  /**
   * Updates one movement frame of the jelly fish pattern.
   */
  updateMovementPattern() {
    if (this.shouldSkipMovement()) return;

    this.moveAlongX();
    this.moveAlongY();
    this.reverseXDirectionIfNeeded();
    this.reverseYDirectionIfNeeded();
  }

  /**
   * Checks whether movement update should be skipped.
   * @returns {*} Result value.
   */
  shouldSkipMovement() {
    return !this.world || this.world.gameState !== "running" || this.isStunned;
  }

  /**
   * Moves jelly fish on horizontal axis.
   */
  moveAlongX() {
    this.position_x += this.speedX;
  }

  /**
   * Moves jelly fish on vertical axis.
   */
  moveAlongY() {
    this.position_y += this.speedY;
  }

  /**
   * Reverses horizontal direction when x-range bounds are reached.
   */
  reverseXDirectionIfNeeded() {
    const maxX = this.startX + this.rangeX;
    const minX = this.startX - this.rangeX;
    if (this.position_x <= minX || this.position_x >= maxX) {
      this.speedX *= -1;
    }
  }

  /**
   * Reverses vertical direction when y-range bounds are reached.
   */
  reverseYDirectionIfNeeded() {
    const maxY = this.startY + this.rangeY;
    const minY = this.startY - this.rangeY;
    if (this.position_y <= minY || this.position_y >= maxY) {
      this.speedY *= -1;
    }
  }
}
