class LifeBar extends StatusBar {
  position_x;
  position_y;
  IMAGES_LIFEBAR = [
    "img/Marcadores/Purple/100_ .png",
    "img/Marcadores/Purple/80_ .png",
    "img/Marcadores/Purple/60_ .png",
    "img/Marcadores/Purple/40_ .png",
    "img/Marcadores/Purple/20__1.png",
    "img/Marcadores/Purple/0_ .png",
  ];
  path = this.IMAGES_LIFEBAR[0];
  position_x = 10;
  position_y = 0;
  lifePercentage = 100;

  constructor() {
    super();
    this.loadImage();
    this.loadImages(this.IMAGES_LIFEBAR);
    this.setLifePercentage(this.lifePercentage);
  }

  setLifePercentage(lifePercentage) {
    this.setPercentage(lifePercentage, this.IMAGES_LIFEBAR);
  }

  setPositionX(position_x) {
    this.position_x = position_x;
  }
}
