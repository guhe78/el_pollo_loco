class Enemy extends MovableObject {
  isStunned = false;
  stunDuration = 3000;
  stunTimeoutId = null;

  /**
   * Creates an enemy base instance.
   * @param {*} path
   * @param {*} position_x
   * @param {*} position_y
   */
  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
  }

  /**
   * Updates enemy animation depending on alive/dead state.
   * @param {*} imageArray
   */
  changeAnimation(imageArray) {
    if (this.isDead()) {
      this.startDeath(imageArray);
    } else {
      this.setAnimation(imageArray);
    }
  }

  /**
   * Starts enemy death animation and removal sequence.
   * @param {*} imageArray
   */
  startDeath(imageArray) {
    if (this.removeStartedAt !== null) return;
    this.startRemove();
    this.setAnimation(imageArray);
  }

  /**
   * Stops enemy movement on both axes.
   */
  stopMovement() {
    this.speedX = 0;
    this.speedY = 0;
  }

  /**
   * Applies stun state for the configured stun duration.
   */
  stun() {
    this.isStunned = true;

    if (this.stunTimeoutId) clearTimeout(this.stunTimeoutId);
    this.stunTimeoutId = setTimeout(() => {
      this.isStunned = false;
    }, this.stunDuration);
  }
}
