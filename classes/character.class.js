class Character extends MovableObject {
  IMAGES_SWIM = [
    "img/Sharkie/3.Swim/1.png",
    "img/Sharkie/3.Swim/2.png",
    "img/Sharkie/3.Swim/3.png",
    "img/Sharkie/3.Swim/4.png",
    "img/Sharkie/3.Swim/5.png",
    "img/Sharkie/3.Swim/6.png",
  ];
  width;
  height;
  world;

  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
    this.width = 250;
    this.height = 200;
    this.loadImage();
    this.loadImages(this.IMAGES_SWIM);
    // this.animate();
    this.world;
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.position_x < 2600) {
        this.moveRight(this.IMAGES_SWIM);
      }
      if (this.world.keyboard.LEFT && this.position_x > 0) {
        this.moveLeft(this.IMAGES_SWIM);
      }
      if (this.world.keyboard.UP) {
        this.moveUp(this.IMAGES_SWIM);
      }
      if (this.world.keyboard.DOWN) {
        this.moveDown(this.IMAGES_SWIM);
      }
      if (this.world.keyboard.SPACE) {
        this.attack(this.IMAGES_SWIM);
      }
    }, 1000 / 60);
  }

  moveRight(images) {
    this.otherDirection = false;
    this.position_x += 10;
    this.playAnimation(images);
    this.world.camera_x = -this.position_x;
  }

  moveLeft(images) {
    this.otherDirection = true;
    this.position_x -= 10;
    this.playAnimation(images);
    this.world.camera_x = -this.position_x;
  }

  moveUp(images) {
    this.position_y -= 10;
    this.playAnimation(images);
  }

  moveDown(images) {
    this.position_y += 10;
    this.playAnimation(images);
  }

  attack(images) {
    this.position_x += 100;
    this.playAnimation(images);
    setTimeout(() => {
      this.position_x -= 100;
    }, 50);
  }
}
