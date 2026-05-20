class Section {
  constructor(
    startX,
    length,
    backgrounds,
    enemies = [],
    collectibles = [],
    endboss = null,
  ) {
    this.startX = startX;
    this.length = length;
    this.endX = startX + length;
    this.backgrounds = backgrounds;
    this.enemies = enemies;
    this.collectibles = collectibles;
    this.endboss = endboss;
  }
}
