class Enemy extends MovableObject {
  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
  }

  changeAnimation(imageArray) {
    if (this.isDead()) {
      this.startDeath();
    } else {
      this.setAnimation(imageArray);
    }
  }

  startDeath(imageArray) {
    if (this.deathStartedAt !== null) return;
    this.deathStartedAt = Date.now();
    this.setAnimation(imageArray);
  }

  shouldBeRemoved() {
    return (
      this.deathStartedAt !== null &&
      Date.now() - this.deathStartedAt >= this.deathDuration
    );
  }
}
