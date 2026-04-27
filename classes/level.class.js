class Level {
  enemies;
  barriers;
  backgrounds;
  backgroundWater;
  level_end_x = 3500;

  constructor(enemies, barriers, backgrounds, backgroundWater) {
    this.enemies = enemies;
    this.barriers = barriers;
    this.backgrounds = backgrounds;
    this.backgroundWater = backgroundWater;
  }
}
