class Coins extends DrawableObject {
  IMAGES = [
    "img/Marcadores/1. Coins/1.png",
    "img/Marcadores/1. Coins/2.png",
    "img/Marcadores/1. Coins/3.png",
    "img/Marcadores/1. Coins/4.png",
  ];
  path;
  position_x;
  position_y;
  width;
  height;
  offset = {};
  collected = false;

  image;
  imageCache = {};
  randomElement = parseInt(Math.random() * this.IMAGES.length);

  constructor(position_x, position_y) {
    super();
    this.path = this.IMAGES[this.randomElement];
    this.position_x = position_x;
    this.position_y = position_y;
    this.width = 40;
    this.height = 40;
    this.offset = {
      top: 5,
      bottom: 10,
      right: 5,
      left: 5,
    };

    this.loadImage();
  }
}
