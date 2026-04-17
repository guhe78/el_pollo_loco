class MovableObject {
  path;
  position_x;
  position_y;
  width;
  height;
  image;
  imageCache;

  constructor(path, position_x, position_y, width, height) {
    this.path = path;
    this.position_x = position_x;
    this.position_y = position_y;
    this.width = width;
    this.height = height;
    this.imageCache = {};
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

  moveLeft() {
    console.log("Move left.");
  }

  moveRight() {
    console.log("Move right.");
  }

  moveObject(xReducer, objectWidth) {
    let positionStart = this.position_x;
    setInterval(() => {
      if (this.position_x >= objectWidth) {
        this.position_x = positionStart;
      }
      this.position_x -= xReducer;
      console.log(this.position_x);
    }, 1000 / 60);
  }
}
