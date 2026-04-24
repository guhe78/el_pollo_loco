class PoisonBar extends StatusBar {
  position_x;
  position_y;
  IMAGES_POISONBAR = [
    "img/Marcadores/Purple/0_.png",
    "img/Marcadores/Purple/20_.png",
    "img/Marcadores/Purple/40_.png",
    "img/Marcadores/Purple/60_.png",
    "img/Marcadores/Purple/80_.png",
    "img/Marcadores/Purple/100_.png",
  ];
  poisonPercentage = 0;

  constructor(path, position_x, position_y) {
    super(path);
    this.position_x = position_x;
    this.position_y = position_y;
    this.loadImage();
    this.loadImages(this.IMAGES_POISONBAR);
    this.setPercentage(this.poisonPercentage, this.IMAGES_POISONBAR);
  }
}
