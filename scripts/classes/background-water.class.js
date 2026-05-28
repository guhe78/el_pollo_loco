class BackgroundWater extends MovableObject {
  /**
   * Creates a background water object instance with fixed Y and configured width/height.
   * @param {*} path
   * @param {*} position_x
   */
  constructor(path, position_x) {
    super(path, position_x);
    this.position_y = 0;
    this.width = 3840 / 2.25;
    this.height = 1080 / 2.25;
    this.loadImage();
  }
}
