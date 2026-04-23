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
  width = 150;
  height = 100;
  randomImagesArray = this.randomImages();
  offset = {};

  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
    this.loadImage();
    this.loadImages(this.randomImagesArray);
    //this.moveLeft(0.15 + Math.random() * 0.5);
    this.offset = {
      top: 5,
      bottom: 10,
      right: 5,
      left: 5,
    };
    this.currentAnimation = this.randomImagesArray;
    this.image = this.imageCache[this.randomImagesArray[0]];

    this.startAnimation(() => this.currentAnimation, 1000 / 25);
  }

  moveLeft(speed) {
    setInterval(() => {
      this.position_x -= speed;
    }, 1000 / 60);
  }

  randomImages() {
    return this.IMAGES_SWIM[parseInt(Math.random() * 3)];
  }

  eat() {
    console.log("Mjamm mjamm");
  }
}
