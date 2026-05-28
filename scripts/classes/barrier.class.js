class Barrier extends MovableObject {
  /**
   * Creates a barrier object instance with fixed Y and configurable width/height.
   * @param {*} path
   * @param {*} position_x
   * @param {*} width
   * @param {*} height
   */
  constructor(path, position_x, width, height) {
    super(path, position_x);
    this.position_y = 0;
    this.width = width;
    this.height = height;
    this.loadImage();
  }
}
