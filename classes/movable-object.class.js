class MovableObject extends DrawableObject {
  currentImage = 0;
  otherDirection = false;
  offset = {};
  energy = 100;
  lastHit = 0;
  speedY = 20;
  speedX = 40;
  acceleration = 5;
  removeStartedAt = null;
  removeDuration = 500;
  interval = null;

  constructor(path, position_x, position_y, width, height) {
    super(path, position_x, position_y, width, height);
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

  setAnimation(images) {
    if (this.currentAnimation !== images) {
      this.currentAnimation = images;
      this.currentImage = 0;
    }
  }

  hit(damagePoints) {
    this.energy -= damagePoints;
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

  applyGravitiy() {
    this.interval = setInterval(() => {
      this.position_x += this.speedX;
      if (this.speedY > -40) {
        this.position_y += this.speedY;
        console.log(this.position_x);
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  stopIntervall() {
    if (!this.interval) return;
    clearInterval(this.interval);
    this.interval = null;
  }

  startRemove() {
    if (this.removeStartedAt !== null) return;
    this.removeStartedAt = Date.now();
    this.stopIntervall();
  }

  shouldBeRemoved() {
    return (
      this.removeStartedAt !== null &&
      Date.now() - this.removeStartedAt >= this.removeDuration
    );
  }
}
