class Character extends MovableObject {
  IMAGES_SWIM = [
    "img/Sharkie/3.Swim/1.png",
    "img/Sharkie/3.Swim/2.png",
    "img/Sharkie/3.Swim/3.png",
    "img/Sharkie/3.Swim/4.png",
    "img/Sharkie/3.Swim/5.png",
    "img/Sharkie/3.Swim/6.png",
  ];
  currentImage = 0;

  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
    this.width = 250;
    this.height = 200;
    this.loadImage();
    this.loadImages(this.IMAGES_SWIM);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let path = this.IMAGES_SWIM[this.currentImage];
      this.image = this.imageCache[path];
      this.currentImage++;
    });
  }

  jump() {
    console.log("Jump jump");
  }
}
