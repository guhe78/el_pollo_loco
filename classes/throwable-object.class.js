class ThrowableObject extends MovableObject {
  IMAGES_BUBBLE = [
    "img/Sharkie/4.Attack/Bubble trap/Bubble.png",
    "img/Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png",
  ];
  width;
  height;
  level = level1;
  position_x;
  position_y;

  constructor(position_x, position_y) {
    super();
    this.path = this.IMAGES_BUBBLE[0];
    this.width = 50;
    this.height = 50;
    this.offset = { top: -30, right: -30, bottom: -30, left: -30 };
    this.position_x = position_x;
    this.position_y = position_y;

    this.loadImage();
    this.loadImages(this.IMAGES_BUBBLE);
    this.throw();
  }

  throw() {
    this.speedY = 10;
    this.applyGravitiy();
  }
}
