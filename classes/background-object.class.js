class BackgroundObject extends MovableObject {
  constructor(path, position_x) {
    super(path, position_x);
    this.position_y = 0;
    this.width = 3840 / 2.25;
    this.height = 1080 / 2.25;
    this.loadImage();
    this.moveObject(1.5, this.width);
  }
}
