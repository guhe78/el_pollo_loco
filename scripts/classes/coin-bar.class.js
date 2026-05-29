class CoinBar extends StatusBar {
  IMAGES_COINBAR = [
    "assets/img/Marcadores/Purple/100__1.png",
    "assets/img/Marcadores/Purple/80_ _1.png",
    "assets/img/Marcadores/Purple/60_ _1.png",
    "assets/img/Marcadores/Purple/40_ _1.png",
    "assets/img/Marcadores/Purple/20_ .png",
    "assets/img/Marcadores/Purple/0_ _1.png",
  ];
  path = this.IMAGES_COINBAR[0];
  position_x = 10;
  position_y = 40;
  coinPercentage = 0;

  /**
   * Initializes the coin bar by loading the necessary images and setting the initial percentage.
   */
  constructor() {
    super();
    this.loadImage();
    this.loadImages(this.IMAGES_COINBAR);
    this.setCoinPercentage(this.coinPercentage);
  }

  /**
   * Updates the coin percentage and refreshes the displayed image accordingly.
   * @param {number} coinPercentage
   */
  setCoinPercentage(coinPercentage) {
    this.coinPercentage += coinPercentage;
    this.setPercentage(this.getCoinPercentage(), this.IMAGES_COINBAR);
  }

  /**
   * Returns the current coin percentage.
   * @returns {number}
   */
  getCoinPercentage() {
    return this.coinPercentage;
  }
}
