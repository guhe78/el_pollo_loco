class Enemy extends MovableObject {
  isStunned = false;
  stunDuration = 3000;
  stunTimeoutId = null;

  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
  }

  changeAnimation(imageArray) {
    if (this.isDead()) {
      this.startDeath(imageArray);
    } else {
      this.setAnimation(imageArray);
    }
  }

  startDeath(imageArray) {
    if (this.removeStartedAt !== null) return;
    this.startRemove();
    this.setAnimation(imageArray);
  }

  stopMovement() {
    this.speedX = 0;
    this.speedY = 0;
  }

  stun() {
    this.isStunned = true;

    if (this.stunTimeoutId) clearTimeout(this.stunTimeoutId);
    this.stunTimeoutId = setTimeout(() => {
      this.isStunned = false;
    }, this.stunDuration);
  }
}
