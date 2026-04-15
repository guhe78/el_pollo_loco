class MovableObject {
  position_x;
  position_y;
  image;
  height;
  width;
  path;

  constructor(path, position_x, position_y, width, height) {
    this.path = path;
    this.position_x = position_x;
    this.position_y = position_y;
    this.width = width;
    this.height = height;
  }

  loadImage() {
    this.image = new Image();
    this.image.src = this.path;
  }

  moveLeft() {
    console.log("Move left.");
  }

  moveRight() {
    console.log("Move right.");
  }
}
