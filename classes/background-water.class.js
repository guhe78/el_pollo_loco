class BackgroundWater extends MovableObject {
  constructor(path, position_x) {
    super(path, position_x);
    this.position_y = 0;
    this.width = 1500;
    this.height = 480;
    this.loadImage();
    this.moveObject(0.1);
  }
}
