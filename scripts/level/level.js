const bgTileWidth = Math.round(3840 / 2.25);

const sectionOneLength = bgTileWidth * 2;
const sectionTwoLength = bgTileWidth * 2;
const endbossSectionLength = Math.round(bgTileWidth * 0.65);

const sectionOneStartX = 0;
const sectionTwoStartX = sectionOneStartX + sectionOneLength;
const endbossSectionStartX = sectionTwoStartX + sectionTwoLength;

const backgroundsLightSection = [
  "assets/img/Background/Layers/5. Water/L.png",
  "assets/img/Background/Layers/3.Fondo 1/L.png",
  "assets/img/Background/Layers/4.Fondo 2/L.png",
  "assets/img/Background/Layers/2. Floor/L.png",
];

const backgroundsDarkSection = [
  "assets/img/Background/Layers/5. Water/D.png",
  "assets/img/Background/Layers/3.Fondo 1/D.png",
  "assets/img/Background/Layers/4.Fondo 2/D.png",
  "assets/img/Background/Layers/2. Floor/D.png",
];

const separatorPath = "assets/img/Background/Barrier/3.png";

/**
 * Builds the full level definition.
 * @returns {*} Result value.
 */
function createLevel() {
  return new Level([createFirstSection(), createSecondSection(), createEndbossSection()]);
}

/**
 * Creates a fresh endboss instance for the level.
 * @returns {*} Result value.
 */
function createEndboss() {
  return new Endboss(endbossSectionStartX + endbossSectionLength - 420, 120);
}

/**
 * Creates the first section with puffer enemies and coins.
 * @returns {*} Result value.
 */
function createFirstSection() {
  return new Section(
    sectionOneStartX,
    sectionOneLength,
    createSectionBackgrounds(sectionOneLength, sectionOneStartX, backgroundsLightSection),
    createEnemies("puffer", 10, sectionOneStartX, sectionOneLength),
    createCollectibles("coins", 5, sectionOneStartX, sectionOneLength),
  );
}

/**
 * Creates the second section with jelly enemies and poison.
 * @returns {*} Result value.
 */
function createSecondSection() {
  return new Section(
    sectionTwoStartX,
    sectionTwoLength,
    createSectionBackgrounds(sectionTwoLength, sectionTwoStartX, backgroundsDarkSection),
    createEnemies("jelly", 10, sectionTwoStartX, sectionTwoLength),
    createCollectibles("poison", 5, sectionTwoStartX, sectionTwoLength),
  );
}

/**
 * Creates the endboss section.
 * @returns {*} Result value.
 */
function createEndbossSection() {
  return new Section(
    endbossSectionStartX,
    endbossSectionLength,
    createBackgrounds(endbossSectionLength, endbossSectionStartX, backgroundsDarkSection),
    [],
    [],
    createEndboss(),
  );
}

/**
 * Creates section backgrounds and separator barrier.
 * @param {*} sectionLength
 * @param {*} startX
 * @param {*} backgroundsArray
 * @returns {*} Result value.
 */
function createSectionBackgrounds(sectionLength, startX, backgroundsArray) {
  return [
    ...createBackgrounds(sectionLength, startX, backgroundsArray),
    createSectionBarrier(startX, sectionLength),
  ];
}

/**
 * Creates a section separator barrier object.
 * @param {*} startX
 * @param {*} sectionLength
 * @returns {*} Result value.
 */
function createSectionBarrier(startX, sectionLength) {
  return new Barrier(separatorPath, startX + sectionLength - 300, 500, 480);
}

/**
 * Creates tiled parallax backgrounds for one section.
 * @param {*} sectionLength
 * @param {*} startX
 * @param {*} backgroundsArray
 * @returns {*} Result value.
 */
function createBackgrounds(sectionLength, startX, backgroundsArray) {
  const backgrounds = [];
  const tileCount = Math.ceil(sectionLength / bgTileWidth);

  for (let i = 0; i < tileCount; i++) {
    const tileX = startX + i * bgTileWidth;
    const tileWidth = getBackgroundTileWidth(sectionLength, i);
    backgrounds.push(...createBackgroundTile(backgroundsArray, tileX, tileWidth));
  }

  return backgrounds;
}

/**
 * Calculates width of a single background tile.
 * @param {*} sectionLength
 * @param {*} index
 * @returns {*} Result value.
 */
function getBackgroundTileWidth(sectionLength, index) {
  const remainingWidth = sectionLength - index * bgTileWidth;
  return Math.min(bgTileWidth, remainingWidth);
}

/**
 * Creates one complete set of background layers for a tile slot.
 * @param {*} backgroundsArray
 * @param {*} positionX
 * @param {*} tileWidth
 * @returns {*} Result value.
 */
function createBackgroundTile(backgroundsArray, positionX, tileWidth) {
  const backgrounds = [
    new BackgroundWater(backgroundsArray[0], positionX),
    new BackgroundObject(backgroundsArray[1], positionX),
    new BackgroundObject(backgroundsArray[2], positionX),
    new BackgroundObject(backgroundsArray[3], positionX),
  ];

  backgrounds.forEach((background) => {
    background.width = tileWidth;
  });

  return backgrounds;
}

/**
 * Creates enemies of a given type for one section.
 * @param {*} sort
 * @param {*} count
 * @param {*} startX
 * @param {*} sectionLength
 * @returns {*} Result value.
 */
function createEnemies(sort, count, startX, sectionLength) {
  const enemies = [];
  const enemyArea = getEnemySpawnArea(count, startX, sectionLength);

  for (let i = 0; i < count; i++) {
    const position_x = getEnemySpawnX(enemyArea, i);
    const position_y = randomNumber(420);
    const enemy = createEnemy(sort, position_x, position_y);
    if (enemy) enemies.push(enemy);
  }

  return enemies;
}

/**
 * Computes enemy spawn area values.
 * @param {*} count
 * @param {*} startX
 * @param {*} sectionLength
 * @returns {*} Result value.
 */
function getEnemySpawnArea(count, startX, sectionLength) {
  const minX = startX + 500;
  const maxX = startX + sectionLength - 300;
  return {
    minX,
    spacing: count > 1 ? (maxX - minX) / (count - 1) : 0,
  };
}

/**
 * Calculates x-position of one enemy spawn.
 * @param {*} enemyArea
 * @param {*} index
 * @returns {*} Result value.
 */
function getEnemySpawnX(enemyArea, index) {
  return enemyArea.minX + index * enemyArea.spacing + randomNumber(120) - 60;
}

/**
 * Creates an enemy instance based on requested type.
 * @param {*} sort
 * @param {*} position_x
 * @param {*} position_y
 * @returns {*} Result value.
 */
function createEnemy(sort, position_x, position_y) {
  if (sort === "puffer") {
    return new PufferFish(position_x, position_y);
  }
  if (sort === "jelly") {
    return new JellyFish(position_x, position_y);
  }
  return null;
}

/**
 * Creates collectibles of a given type for one section.
 * @param {*} sort
 * @param {*} count
 * @param {*} startX
 * @param {*} sectionLength
 * @returns {*} Result value.
 */
function createCollectibles(sort, count, startX, sectionLength) {
  const collectibles = [];
  const spawnArea = getCollectibleSpawnArea(startX, sectionLength);

  for (let i = 0; i < count; i++) {
    const position_x = spawnArea.minX + randomNumber(spawnArea.usableWidth);
    const position_y = randomNumber(400);
    const collectible = createCollectible(sort, position_x, position_y);
    if (collectible) collectibles.push(collectible);
  }

  return collectibles;
}

/**
 * Computes collectible spawn area values.
 * @param {*} startX
 * @param {*} sectionLength
 * @returns {*} Result value.
 */
function getCollectibleSpawnArea(startX, sectionLength) {
  return {
    minX: startX + 120,
    usableWidth: Math.max(200, sectionLength - 240),
  };
}

/**
 * Creates a collectible instance based on requested type.
 * @param {*} sort
 * @param {*} position_x
 * @param {*} position_y
 * @returns {*} Result value.
 */
function createCollectible(sort, position_x, position_y) {
  if (sort === "coins") {
    return new Coins(position_x, position_y);
  }
  if (sort === "poison") {
    return new Poison(position_x, position_y);
  }
  return null;
}

/**
 * Returns a random integer within range starting at zero.
 * @param {*} range
 * @returns {*} Result value.
 */
function randomNumber(range) {
  return parseInt(Math.random() * range);
}
