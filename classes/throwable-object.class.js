class ThrowableObject extends MovableObject {
  IMAGES_BUBBLE = [
    "img/Sharkie/4.Attack/Bubble trap/Bubble.png",
    "img/Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png",
  ];

  constructor() {
    super();
    this.path = this.IMAGES_BUBBLE[0];
    this.position_x = 100;
    this.position_y = 100;
    this.width = 50;
    this.height = 50;

    this.loadImage();
    this.loadImages(this.IMAGES_BUBBLE);
    this.throw(100, 100);
  }

  throw(x, y) {
    this.position_x = x;
    this.position_y = y;
    this.speedY = 10;
    this.applyGravitiy();
    setInterval(() => {
      this.position_x += 20;
    }, 25);
  }
}
