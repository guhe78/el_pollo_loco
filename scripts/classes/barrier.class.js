class Barrier extends MovableObject {
  constructor(path, position_x, width, height) {
    super(path, position_x);
    this.position_y = 0;
    this.width = width;
    this.height = height;
    this.loadImage();
  }
}
