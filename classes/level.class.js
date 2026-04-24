class Level {
  enemies;
  barriers;
  backgrounds;
  backgroundWater;
  lifeBar;
  coinBar;
  poisonBar;
  level_end_x = 3500;

  constructor(
    enemies,
    barriers,
    backgrounds,
    backgroundWater,
    lifeBar,
    coinBar,
    poisonBar,
  ) {
    this.enemies = enemies;
    this.barriers = barriers;
    this.backgrounds = backgrounds;
    this.backgroundWater = backgroundWater;
    this.lifeBar = lifeBar;
    this.coinBar = coinBar;
    this.poisonBar = poisonBar;
  }
}
