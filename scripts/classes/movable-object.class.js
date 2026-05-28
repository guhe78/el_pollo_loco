class MovableObject extends DrawableObject {
  currentImage = 0;
  otherDirection = false;
  offset = {};
  energy = 100;
  lastHit = 0;
  speedY = 20;
  speedX = 40;
  acceleration = 5;
  removeStartedAt = null;
  removeDuration = 500;
  interval = null;

  /**
   * Creates a movable object with drawable base properties.
   * @param {*} path
   * @param {*} position_x
   * @param {*} position_y
   * @param {*} width
   * @param {*} height
   */
  constructor(path, position_x, position_y, width, height) {
    super(path, position_x, position_y, width, height);
  }

  /**
   * Plays the next frame from the given image sequence.
   * @param {*} images
   */
  playAnimation(images) {
    const i = this.currentImage % images.length;
    const path = images[i];
    this.image = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Starts a repeating animation loop.
   * @param {*} getImages
   * @param {*} speed
   */
  startAnimation(getImages, speed) {
    this.animationInterval = setInterval(() => {
      const images = getImages();
      if (!images || images.length === 0) {
        return;
      }
      this.playAnimation(images);
    }, speed);
  }

  /**
   * Checks axis-aligned collision against another movable object.
   * @param {*} movableObject
   * @returns {*} Result value.
   */
  isColliding(movableObject) {
    return (
      this.position_x + this.width - this.offset.right >
        movableObject.position_x + movableObject.offset.left &&
      this.position_y + this.height - this.offset.bottom >
        movableObject.position_y + movableObject.offset.top &&
      this.position_x + this.offset.left <
        movableObject.position_x +
          movableObject.width -
          movableObject.offset.right &&
      this.position_y + this.offset.top <
        movableObject.position_y +
          movableObject.height -
          movableObject.offset.bottom
    );
  }

  /**
   * Changes active animation and resets frame index on change.
   * @param {*} images
   */
  setAnimation(images) {
    if (this.currentAnimation !== images) {
      this.currentAnimation = images;
      this.currentImage = 0;
    }
  }

  /**
   * Applies damage and updates hit timestamp.
   * @param {*} damagePoints
   */
  hit(damagePoints) {
    this.energy -= damagePoints;
    if (this.isDead(this)) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks whether the object is currently in hurt state.
   * @returns {*} Result value.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 500;
  }

  /**
   * Checks whether object energy is depleted.
   * @returns {*} Result value.
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Starts gravity-like movement interval for projectiles.
   */
  applyGravitiy() {
    this.interval = setInterval(() => {
      this.position_x += this.speedX;
      if (this.speedY > -40) {
        this.position_y += this.speedY;
        console.log(this.position_x);
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Stops the active movement interval.
   */
  stopIntervall() {
    if (!this.interval) return;
    clearInterval(this.interval);
    this.interval = null;
  }

  /**
   * Marks object for delayed removal.
   */
  startRemove() {
    if (this.removeStartedAt !== null) return;
    this.removeStartedAt = Date.now();
    this.stopIntervall();
  }

  /**
   * Checks whether removal delay has elapsed.
   * @returns {*} Result value.
   */
  shouldBeRemoved() {
    return (
      this.removeStartedAt !== null &&
      Date.now() - this.removeStartedAt >= this.removeDuration
    );
  }
}
