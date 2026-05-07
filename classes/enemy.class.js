class Enemy extends MovableObject {
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
}
