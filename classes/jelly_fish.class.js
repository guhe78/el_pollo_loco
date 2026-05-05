class JellyFish extends Enemy {
  IMAGES_SWIM = [
    [
      "img/Enemy/2 Jelly fish/Regular damage/Lila 1.png",
      "img/Enemy/2 Jelly fish/Regular damage/Lila 2.png",
      "img/Enemy/2 Jelly fish/Regular damage/Lila 3.png",
      "img/Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    ],
    [
      "img/Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
      "img/Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
      "img/Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
      "img/Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
    ],
  ];
  IMAGES_DIE = [
    [
      "img/Enemy/2 Jelly fish/Dead/Lila/L1.png",
      "img/Enemy/2 Jelly fish/Dead/Lila/L2.png",
      "img/Enemy/2 Jelly fish/Dead/Lila/L3.png",
      "img/Enemy/2 Jelly fish/Dead/Lila/L4.png",
    ],
    [
      "img/Enemy/2 Jelly fish/Dead/Yellow/y1.png",
      "img/Enemy/2 Jelly fish/Dead/Yellow/y2.png",
      "img/Enemy/2 Jelly fish/Dead/Yellow/y3.png",
      "img/Enemy/2 Jelly fish/Dead/Yellow/y4.png",
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
  deathStartedAt = null;
  deathDuration = 500;

  constructor(position_x, position_y) {
    super();
    this.path = this.IMAGES_SWIM[this.randomElement][0];
    this.position_x = position_x;
    this.position_y = position_y;
    this.loadImage();
    this.loadEnemyImages();
    //this.moveUp(0.15 + Math.random() * 0.5);
    this.offset = {
      top: 5,
      bottom: 10,
      right: 5,
      left: 5,
    };
    this.currentAnimation = this.randomImagesSwimArray;
    this.image = this.imageCache[this.randomImagesSwimArray[0]];

    this.startAnimation(() => this.currentAnimation, 200);
  }

  loadEnemyImages() {
    this.loadImages(this.randomImagesSwimArray);
    this.loadImages(this.randomImagesDieArray);
  }

  moveUp(speed) {
    setInterval(() => {
      this.position_y -= speed;
    }, 1000 / 60);
  }
}
