class JellyFish extends Enemy {
  IMAGES_SWIM = [
    [
      "../../assets/img/Enemy/2 Jelly fish/Regular damage/Lila 1.png",
      "../../assets/img/Enemy/2 Jelly fish/Regular damage/Lila 2.png",
      "../../assets/img/Enemy/2 Jelly fish/Regular damage/Lila 3.png",
      "../../assets/img/Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    ],
    [
      "../../assets/img/Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
      "../../assets/img/Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
      "../../assets/img/Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
      "../../assets/img/Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
    ],
  ];
  IMAGES_DIE = [
    [
      "../../assets/img/Enemy/2 Jelly fish/Dead/Lila/L1.png",
      "../../assets/img/Enemy/2 Jelly fish/Dead/Lila/L2.png",
      "../../assets/img/Enemy/2 Jelly fish/Dead/Lila/L3.png",
      "../../assets/img/Enemy/2 Jelly fish/Dead/Lila/L4.png",
    ],
    [
      "../../assets/img/Enemy/2 Jelly fish/Dead/Yellow/y1.png",
      "../../assets/img/Enemy/2 Jelly fish/Dead/Yellow/y2.png",
      "../../assets/img/Enemy/2 Jelly fish/Dead/Yellow/y3.png",
      "../../assets/img/Enemy/2 Jelly fish/Dead/Yellow/y4.png",
    ],
  ];
  path;
  position_x;
  position_y;
  width = 150;
  height = 100;
  randomElement = parseInt(Math.random() * this.IMAGES_SWIM.length);
  randomImagesSwimArray = this.IMAGES_SWIM[this.randomElement];
  randomImagesDieArray = this.IMAGES_DIE[this.randomElement];
  offset = {};
  startX;
  startY;
  speedX = 2;
  speedY = 2;
  rangeX = 80;
  rangeY = 80;

  constructor(position_x, position_y) {
    super();
    this.path = this.IMAGES_SWIM[this.randomElement][0];
    this.position_x = position_x;
    this.position_y = position_y;
    this.startX = position_x;
    this.startY = position_y;
    this.speedX = Math.random() > 0.5 ? 2 : -2;
    this.speedY = Math.random() > 0.5 ? 2 : -2;
    this.offset = {
      top: 5,
      bottom: 10,
      right: 5,
      left: 5,
    };
    this.loadImage();
    this.loadEnemyImages();
    this.moveInXPattern();
    this.currentAnimation = this.randomImagesSwimArray;
    this.image = this.imageCache[this.randomImagesSwimArray[0]];

    this.startAnimation(() => this.currentAnimation, 200);
  }

  loadEnemyImages() {
    this.loadImages(this.randomImagesSwimArray);
    this.loadImages(this.randomImagesDieArray);
  }

  moveInXPattern() {
    setInterval(() => {
      if (!this.world || this.world.gameState !== "running" || this.isStunned)
        return;

      this.position_x += this.speedX;
      this.position_y += this.speedY;

      if (
        this.position_x >= this.startX + this.rangeX ||
        this.position_x <= this.startX - this.rangeX
      ) {
        this.speedX *= -1;
      }

      if (
        this.position_y >= this.startY + this.rangeY ||
        this.position_y <= this.startY - this.rangeY
      ) {
        this.speedY *= -1;
      }
    }, 1000 / 60);
  }
}
