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

  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
    this.width = 150;
    this.height = 100;
    this.loadImage();
    this.randomImagesArray = this.randomImages();
    this.loadImages(this.randomImagesArray);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(0.15 + Math.random() * 0.5);
      this.playAnimation(this.randomImagesArray);
    }, 1000 / 60);
  }

  moveLeft(speed) {
    this.position_x -= speed;
  }

  randomImages() {
    return this.IMAGES_SWIM[parseInt(Math.random() * 3)];
  }

  eat() {
    console.log("Mjamm mjamm");
  }
}
