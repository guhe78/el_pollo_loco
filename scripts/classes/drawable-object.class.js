class DrawableObject {
  path;
  position_x;
  position_y;
  width;
  height;
  image;
  imageCache = {};

  /**
   * Creates a drawable object with base render properties.
   * @param {*} path
   * @param {*} position_x
   * @param {*} position_y
   * @param {*} width
   * @param {*} height
   */
  constructor(path, position_x, position_y, width, height) {
    this.path = path;
    this.position_x = position_x;
    this.position_y = position_y;
    this.width = width;
    this.height = height;
  }

  /**
   * Loads the primary image for this object.
   */
  loadImage() {
    this.image = new Image();
    this.image.src = this.path;
  }

  /**
   * Preloads an array of image paths into image cache.
   * @param {*} pathArray
   */
  loadImages(pathArray) {
    pathArray.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }

  /**
   * Draws the object image at its current position and size.
   * @param {*} ctx
   */
  draw(ctx) {
    ctx.drawImage(this.image, this.position_x, this.position_y, this.width, this.height);
  }

  /**
   * Draws a debug frame for selected object types.
   * @param {*} ctx
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Enemy || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.roundRect(this.position_x, this.position_y, this.width, this.height, [100]);
    }
  }
}
