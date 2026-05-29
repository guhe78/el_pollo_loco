class ThrowableObject extends MovableObject {
  IMAGES_BUBBLE = [
    "assets/img/Sharkie/4.Attack/Bubble trap/Bubble.png",
    "assets/img/Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png",
  ];
  width;
  height;
  level = world.level;
  position_x;
  position_y;
  direction;
  removeDuration;

  /**
   * Creates a throwable bubble projectile.
   * @param {*} position_x
   * @param {*} position_y
   * @param {*} direction
   */
  constructor(position_x, position_y, direction) {
    super();
    this.path = this.IMAGES_BUBBLE[0];
    this.width = 50;
    this.height = 50;
    this.offset = { top: -30, right: -30, bottom: -30, left: -30 };
    this.position_x = position_x;
    this.position_y = position_y;
    this.direction = direction;
    this.speedX = 28 * direction;
    this.otherDirection = direction < 0;
    this.removeDuration = 0;

    this.loadImage();
    this.loadImages(this.IMAGES_BUBBLE);
    this.throw();
  }

  /**
   * Starts projectile movement and marks bubble for removal at top edge.
   */
  throw() {
    this.speedY = 10;
    this.interval = setInterval(() => {
      if (this.removeStartedAt !== null) {
        this.stopIntervall();
        return;
      }

      this.position_x += this.speedX;
      this.position_y += this.speedY;
      this.speedY -= this.acceleration;

      if (this.position_y + this.height <= 0) {
        this.startRemove();
      }
    }, 1000 / 25);
  }
}
