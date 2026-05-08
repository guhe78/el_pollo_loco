class Section {
  constructor(startX, backgrounds, enemies, collectibles, endboss = null) {
    this.startX = startX;
    this.backgrounds = backgrounds;
    this.enemies = enemies;
    this.collectibles = collectibles;
    this.endboss = endboss;
  }
}

// constructor(
//     enemies,
//     endboss,
//     barriers,
//     backgrounds,
//     backgroundWater,
//     collectibles,
//   ) {
//     this.enemies = enemies;
//     this.endboss = endboss;
//     this.barriers = barriers;
//     this.backgrounds = backgrounds;
//     this.backgroundWater = backgroundWater;
//     this.collectibles = collectibles;
//   }
