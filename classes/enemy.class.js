class Enemy extends MovableObject {
  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
  }

  changeAnimation() {
    if (this.isDead()) {
      this.startDeath();
    } else {
      this.setAnimation(this.randomImagesSwimArray);
    }
  }

  startDeath() {
    if (this.deathStartedAt !== null) return;
    this.deathStartedAt = Date.now();
    this.setAnimation(this.randomImagesDieArray);
  }

  shouldBeRemoved() {
    return (
      this.deathStartedAt !== null &&
      Date.now() - this.deathStartedAt >= this.deathDuration
    );
  }
}
