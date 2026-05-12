class Section {
  constructor(
    startX,
    backgrounds,
    enemies = [],
    collectibles = [],
    endboss = null,
  ) {
    this.startX = startX;
    this.backgrounds = backgrounds;
    this.enemies = enemies;
    this.collectibles = collectibles;
    this.endboss = endboss;
  }
}
