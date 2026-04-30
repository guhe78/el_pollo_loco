class Enemy extends MovableObject {
  IMAGES_SWIM = [
    [
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
    ],
    [
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png",
    ],
    [
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
    ],
  ];
  IMAGES_DIE = [
    [
      "img/Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
      "img/Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
      "img/Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png",
    ],
    [
      "img/Enemy/1.Puffer fish (3 color options)/4.DIE/2.png",
      "img/Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png",
      "img/Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png",
    ],
    [
      "img/Enemy/1.Puffer fish (3 color options)/4.DIE/3.png",
      "img/Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png",
      "img/Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png",
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

  constructor() {
    super();
    this.path = this.IMAGES_SWIM[this.randomElement][0];
    this.position_x = 400 + Math.random() * 200;
    this.position_y = Math.random() * 420;
    this.loadImage();
    this.loadEnemyImages();
    //this.moveLeft(0.15 + Math.random() * 0.5);
    this.offset = {
      top: 5,
      bottom: 10,
      right: 5,
      left: 5,
    };
    this.currentAnimation = this.randomImagesSwimArray;
    this.image = this.imageCache[this.randomImagesSwimArray[0]];

    this.startAnimation(() => this.currentAnimation, 1000 / 25);
  }

  loadEnemyImages() {
    this.loadImages(this.randomImagesSwimArray);
    this.loadImages(this.randomImagesDieArray);
  }

  changeAnimation(isMoving) {
    if (this.isDead()) {
      this.setAnimation(this.randomImagesDieArray);
    } else if (isMoving) {
      this.setAnimation(this.randomImagesSwimArray);
    }
  }

  moveLeft(speed) {
    setInterval(() => {
      this.position_x -= speed;
    }, 1000 / 60);
  }
}
