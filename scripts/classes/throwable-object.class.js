class ThrowableObject extends MovableObject {
  IMAGES_BUBBLE = [
    "../../assets/img/Sharkie/4.Attack/Bubble trap/Bubble.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png",
  ];
  width;
  height;
  level = level1;
  position_x;
  position_y;
  direction;
  removeDuration;

  constructor(position_x, position_y, direction) {
    super();
    this.path = this.IMAGES_BUBBLE[0];
    this.width = 50;
    this.height = 50;
    this.offset = { top: -30, right: -30, bottom: -30, left: -30 };
    this.position_x = position_x;
    this.position_y = position_y;
    this.direction = direction;
    this.speedX = 40 * direction;
    this.otherDirection = direction < 0;
    this.removeDuration = 0;

    this.loadImage();
    this.loadImages(this.IMAGES_BUBBLE);
    this.throw();
  }

  throw() {
    this.speedY = 10;
    this.applyGravitiy();
  }
}
