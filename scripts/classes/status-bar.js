class StatusBar extends DrawableObject {
  width;
  height;
  percentage;

  /**
   * Creates a status bar with default dimensions.
   * @param {*} path
   * @param {*} position_x
   * @param {*} position_y
   */
  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
    this.width = 150;
    this.height = 50;
  }

  /**
   * Updates bar percentage and selects the matching image frame.
   * @param {*} percentage
   * @param {*} images
   */
  setPercentage(percentage, images) {
    this.percentage = percentage;
    let path = images[this.resolveImageIndex()];
    this.image = this.imageCache[path];
  }

  /**
   * Resolves the current image index for the configured percentage.
   * @returns {*} Result value.
   */
  resolveImageIndex() {
    if (this.percentage > 80) {
      return 0;
    } else if (this.percentage > 60 && this.percentage <= 80) {
      return 1;
    } else if (this.percentage > 40 && this.percentage <= 60) {
      return 2;
    } else if (this.percentage > 20 && this.percentage <= 40) {
      return 3;
    } else if (this.percentage > 0 && this.percentage <= 20) {
      return 4;
    } else if (this.percentage <= 0) {
      return 5;
    }
  }
}
