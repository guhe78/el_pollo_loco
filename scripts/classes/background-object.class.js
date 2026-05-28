class BackgroundObject extends MovableObject {
  /**
   * Creates a background object instance with fixed Y and configured width/height.
   * @param {*} path
   * @param {*} position_x
   */
  constructor(path, position_x) {
    super(path, position_x);
    this.position_y = 0;
    this.width = Math.round(3840 / 2.25);
    this.height = Math.round(1080 / 2.25);
    this.loadImage();
  }
}
