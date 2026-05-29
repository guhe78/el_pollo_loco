class LifeBar extends StatusBar {
  IMAGES_LIFEBAR = [
    "assets/img/Marcadores/Purple/100_ .png",
    "assets/img/Marcadores/Purple/80_ .png",
    "assets/img/Marcadores/Purple/60_ .png",
    "assets/img/Marcadores/Purple/40_ .png",
    "assets/img/Marcadores/Purple/20__1.png",
    "assets/img/Marcadores/Purple/0_ .png",
  ];
  path = this.IMAGES_LIFEBAR[0];
  position_x = 10;
  position_y = 0;
  lifePercentage = 100;

  /**
   * Creates the life bar and loads life bar image assets.
   */
  constructor() {
    super();
    this.loadImage();
    this.loadImages(this.IMAGES_LIFEBAR);
    this.setLifePercentage(this.lifePercentage);
  }

  /**
   * Sets life percentage and updates displayed life bar frame.
   * @param {*} lifePercentage
   */
  setLifePercentage(lifePercentage) {
    this.setPercentage(lifePercentage, this.IMAGES_LIFEBAR);
  }

  /**
   * Sets horizontal screen position of the life bar.
   * @param {*} position_x
   */
  setPositionX(position_x) {
    this.position_x = position_x;
  }
}
