class PufferFish extends Enemy {
  IMAGES_SWIM = [
    [
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
    ],
    [
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
    ],
    [
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png",
    ],
  ];
  IMAGES_DIE = [
    [
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png",
    ],
    [
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/4.DIE/2.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png",
    ],
    [
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/4.DIE/3.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png",
      "../../assets/img/Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
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
  centerX;
  centerY;
  radiusX;
  radiusY;
  angle;
  angularSpeed;

  constructor(position_x, position_y) {
    super();
    this.path = this.IMAGES_SWIM[this.randomElement][0];
    this.position_x = position_x;
    this.position_y = position_y;
    this.centerX = position_x;
    this.centerY = position_y;
    this.radiusX = 80 + Math.random() * 100;
    this.radiusY = 40 + Math.random() * 100;
    this.angle = Math.random() * Math.PI * 2;
    this.angularSpeed = Math.random() * 0.03;
    this.loadImage();
    this.loadEnemyImages();
    this.moveAround();
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

  moveAround() {
    setInterval(() => {
      if (!this.world || this.world.gameState !== "running") return;

      this.angle += this.angularSpeed;
      this.position_x = this.centerX + Math.cos(this.angle) * this.radiusX;
      this.position_y = this.centerY + Math.sin(this.angle) * this.radiusY;
    }, 1000 / 60);
  }
}
