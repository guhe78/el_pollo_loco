class Endboss extends Enemy {
  IMAGES_SWIM = [
    "img/Enemy/3 Final Enemy/2.floating/1.png",
    "img/Enemy/3 Final Enemy/2.floating/2.png",
    "img/Enemy/3 Final Enemy/2.floating/3.png",
    "img/Enemy/3 Final Enemy/2.floating/4.png",
    "img/Enemy/3 Final Enemy/2.floating/5.png",
    "img/Enemy/3 Final Enemy/2.floating/6.png",
    "img/Enemy/3 Final Enemy/2.floating/7.png",
    "img/Enemy/3 Final Enemy/2.floating/8.png",
    "img/Enemy/3 Final Enemy/2.floating/9.png",
    "img/Enemy/3 Final Enemy/2.floating/10.png",
    "img/Enemy/3 Final Enemy/2.floating/11.png",
    "img/Enemy/3 Final Enemy/2.floating/12.png",
    "img/Enemy/3 Final Enemy/2.floating/13.png",
  ];
  IMAGES_ATTACK = [
    "img/Enemy/3 Final Enemy/Attack/1.png",
    "img/Enemy/3 Final Enemy/Attack/2.png",
    "img/Enemy/3 Final Enemy/Attack/3.png",
    "img/Enemy/3 Final Enemy/Attack/4.png",
    "img/Enemy/3 Final Enemy/Attack/5.png",
    "img/Enemy/3 Final Enemy/Attack/6.png",
  ];
  IMAGES_DEAD = [
    "img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];
  path;
  position_x;
  position_y;
  width = 300;
  height = 250;
  world;
  offset = {};

  constructor(position_x, position_y) {
    super();
    this.path = this.IMAGES_SWIM[0];
    this.position_x = position_x;
    this.position_y = position_y;
    this.loadImage();
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.offset = {
      top: 190,
      bottom: 80,
      right: 20,
      left: 20,
    };
    this.currentAnimation = this.IMAGES_SWIM;
    this.image = this.imageCache[this.IMAGES_SWIM[0]];

    this.startAnimation(() => this.currentAnimation, 200);
  }
}
