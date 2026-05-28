class EndbossLifeBar extends LifeBar {
  /**
   * Creates the endboss life bar with default vertical position.
   */
  constructor() {
    super();
    this.position_y = 0;
  }

  /**
   * Sets horizontal screen position of the endboss life bar.
   * @param {*} position_x
   */
  setPositionX(position_x) {
    this.position_x = position_x;
  }

  /**
   * Draws mirrored and color-shifted endboss life bar image.
   * @param {*} ctx
   */
  draw(ctx) {
    const centerX = this.position_x + this.width / 2;
    const centerY = this.position_y + this.height / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(-1, 1);
    ctx.filter = "hue-rotate(140deg) saturate(1.35) brightness(1.05)";
    ctx.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    );
    ctx.filter = "none";
    ctx.restore();
  }
}
