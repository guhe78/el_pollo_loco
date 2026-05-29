class Poison extends DrawableObject {
  IMAGES = [
    "assets/img/Marcadores/Poison/Dark - Left.png",
    "assets/img/Marcadores/Poison/Dark - Right.png",
    "assets/img/Marcadores/Poison/Light - Left.png",
    "assets/img/Marcadores/Poison/Light - Right.png",
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

  /**
   * Creates a poison collectible with a random sprite variant.
   * @param {*} position_x
   * @param {*} position_y
   */
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
