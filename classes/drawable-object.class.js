class DrawableObject {
  path;
  position_x;
  position_y;
  width;
  height;
  image;
  imageCache = {};

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

  loadImages(pathArray) {
    pathArray.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position_x,
      this.position_y,
      this.width,
      this.height,
    );
  }
}
