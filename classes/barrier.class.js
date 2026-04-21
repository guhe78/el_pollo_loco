class Barrier extends MovableObject {
  constructor(path, position_x) {
    super(path, position_x);
    this.position_y = 0;
    this.width = 600;
    this.height = 480;
    this.loadImage();
  }
}
