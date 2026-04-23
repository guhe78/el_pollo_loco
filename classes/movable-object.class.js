class MovableObject {
  path;
  position_x;
  position_y;
  width;
  height;
  image;
  imageCache = {};
  currentImage = 0;
  otherDirection = false;
  offset = {};
  energy = 100;
  lastHit = 0;

  constructor(path, position_x, position_y, width, height) {
    this.path = path;
    this.position_x = position_x;
    this.position_y = position_y;
    this.width = width;
    this.height = height;
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

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Enemy ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.roundRect(
        this.position_x,
        this.position_y,
        this.width,
        this.height,
        [100],
      );
    }
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

  playAnimation(images) {
    const i = this.currentImage % images.length;
    const path = images[i];
    this.image = this.imageCache[path];
    this.currentImage++;
  }

  startAnimation(getImages, speed) {
    this.animationInterval = setInterval(() => {
      const images = getImages();
      if (!images || images.length === 0) {
        return;
      }
      this.playAnimation(images);
    }, speed);
  }

  moveObject(speed, objectWidth) {
    let positionStart = this.position_x;
  }

  isColliding(movableObject) {
    return (
      this.position_x + this.width - this.offset.right >
        movableObject.position_x + movableObject.offset.left &&
      this.position_y + this.height - this.offset.bottom >
        movableObject.position_y + movableObject.offset.top &&
      this.position_x + this.offset.left <
        movableObject.position_x +
          movableObject.width -
          movableObject.offset.right &&
      this.position_y + this.offset.top <
        movableObject.position_y +
          movableObject.height -
          movableObject.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    if (this.isDead(this)) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 500;
  }

  isDead() {
    return this.energy <= 0;
  }
}
