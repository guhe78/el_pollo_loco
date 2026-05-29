class Section {
  /**
   * Creates a level section with world objects and optional endboss.
   * @param {*} startX
   * @param {*} length
   * @param {*} backgrounds
   * @param {*} enemies
   * @param {*} collectibles
   * @param {*} endboss
   */
  constructor(startX, length, backgrounds, enemies = [], collectibles = [], endboss = null) {
    this.startX = startX;
    this.length = length;
    this.endX = startX + length;
    this.backgrounds = backgrounds;
    this.enemies = enemies;
    this.collectibles = collectibles;
    this.endboss = endboss;
  }
}
