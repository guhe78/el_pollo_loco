class MovableObject {
  position_x;
  position_y;
  image;
  imagePath;

  constructor(position_x, position_y, imagePath) {
    this.position_x = position_x;
    this.position_y = position_y;
    this.imagePath = imagePath;
  }

  loadImage(path) {
    this.image = new Image();
    this.image.src = imagePath;
  }

  moveLeft() {
    console.log("Move left.");
  }

  moveRight() {
    console.log("Move right.");
  }
}
