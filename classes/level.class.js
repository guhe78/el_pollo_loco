class Level {
  enemies;
  endboss;
  barriers;
  backgrounds;
  backgroundWater;
  level_end_x = 3500;

  constructor(enemies, endboss, barriers, backgrounds, backgroundWater) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.barriers = barriers;
    this.backgrounds = backgrounds;
    this.backgroundWater = backgroundWater;
  }
}
