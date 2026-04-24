class CoinBar extends StatusBar {
  position_x;
  position_y;
  IMAGES_COINBAR = [
    "img/Marcadores/Purple/100__1.png",
    "img/Marcadores/Purple/80_ _1.png",
    "img/Marcadores/Purple/60_ _1.png",
    "img/Marcadores/Purple/40_ _1.png",
    "img/Marcadores/Purple/20_ .png",
    "img/Marcadores/Purple/0_ _1.png",
  ];
  coinPercentage = 0;

  constructor(path, position_x, position_y) {
    super(path);
    this.position_x = position_x;
    this.position_y = position_y;
    this.loadImage();
    this.loadImages(this.IMAGES_COINBAR);
    this.setPercentage(this.coinPercentage, this.IMAGES_COINBAR);
  }
}
