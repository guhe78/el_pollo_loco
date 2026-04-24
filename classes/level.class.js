class Level {
  enemies;
  barriers;
  backgrounds;
  backgroundWater;
  statusBars;
  level_end_x = 3500;

  constructor(enemies, barriers, backgrounds, backgroundWater, statusBars) {
    this.enemies = enemies;
    this.barriers = barriers;
    this.backgrounds = backgrounds;
    this.backgroundWater = backgroundWater;
    this.statusBars = statusBars;
  }
}
