class PoisonBar extends StatusBar {
  IMAGES_POISONBAR = [
    "assets/img/Marcadores/Purple/100_.png",
    "assets/img/Marcadores/Purple/80_.png",
    "assets/img/Marcadores/Purple/60_.png",
    "assets/img/Marcadores/Purple/40_.png",
    "assets/img/Marcadores/Purple/20_.png",
    "assets/img/Marcadores/Purple/0_.png",
  ];
  path = this.IMAGES_POISONBAR[0];
  position_x = 10;
  position_y = 80;
  poisonPercentage = 0;

  /**
   * Creates the poison status bar and loads its image assets.
   */
  constructor() {
    super();
    this.loadImage();
    this.loadImages(this.IMAGES_POISONBAR);
    this.setPercentage(this.poisonPercentage, this.IMAGES_POISONBAR);
  }

  /**
   * Increases poison value and updates displayed bar image.
   * @param {*} poisonPercentage
   */
  setPoisonPercentage(poisonPercentage) {
    this.poisonPercentage += poisonPercentage;
    this.setPercentage(this.getPoisonPercentage(), this.IMAGES_POISONBAR);
  }

  /**
   * Returns current poison percentage value.
   * @returns {*} Result value.
   */
  getPoisonPercentage() {
    return this.poisonPercentage;
  }
}
