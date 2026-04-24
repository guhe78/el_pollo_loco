class StatusBar extends DrawableObject {
  width;
  height;
  percentage;

  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
    this.width = 300;
    this.height = 100;
  }

  setPercentage(percentage, images) {
    this.percentage = percentage;
    let path = images[this.resolveImageIndex()];
    this.image = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage > 80) {
      return 0;
    } else if (this.percentage > 60) {
      return 1;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 3;
    } else if (this.percentage > 0) {
      return 4;
    } else {
      return 5;
    }
  }
}
