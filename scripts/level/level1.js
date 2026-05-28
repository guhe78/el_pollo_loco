const BG_TILE_WIDTH = Math.round(3840 / 2.25);

const SECTION_ONE_LENGTH = BG_TILE_WIDTH * 2;
const SECTION_TWO_LENGTH = BG_TILE_WIDTH * 2;
const ENDBOSS_SECTION_LENGTH = Math.round(BG_TILE_WIDTH * 0.65);

const sectionOneStartX = 0;
const sectionTwoStartX = sectionOneStartX + SECTION_ONE_LENGTH;
const endbossSectionStartX = sectionTwoStartX + SECTION_TWO_LENGTH;

const backgroundsLightSection = [
  "../../assets/img/Background/Layers/5. Water/L.png",
  "../../assets/img/Background/Layers/3.Fondo 1/L.png",
  "../../assets/img/Background/Layers/4.Fondo 2/L.png",
  "../../assets/img/Background/Layers/2. Floor/L.png",
];

const backgroundsDarkSection = [
  "../../assets/img/Background/Layers/5. Water/D.png",
  "../../assets/img/Background/Layers/3.Fondo 1/D.png",
  "../../assets/img/Background/Layers/4.Fondo 2/D.png",
  "../../assets/img/Background/Layers/2. Floor/D.png",
];

const separatorPath = "../../assets/img/Background/Barrier/3.png";

const endboss = new Endboss(
  endbossSectionStartX + ENDBOSS_SECTION_LENGTH - 420,
  120,
);

function createLevel() {
  return new Level([
    createFirstSection(),
    createSecondSection(),
    createEndbossSection(),
  ]);
}

function createFirstSection() {
  return new Section(
    sectionOneStartX,
    SECTION_ONE_LENGTH,
    createSectionBackgrounds(
      SECTION_ONE_LENGTH,
      sectionOneStartX,
      backgroundsLightSection,
    ),
    createEnemies("puffer", 10, sectionOneStartX, SECTION_ONE_LENGTH),
    createCollectibles("coins", 5, sectionOneStartX, SECTION_ONE_LENGTH),
  );
}

function createSecondSection() {
  return new Section(
    sectionTwoStartX,
    SECTION_TWO_LENGTH,
    createSectionBackgrounds(
      SECTION_TWO_LENGTH,
      sectionTwoStartX,
      backgroundsDarkSection,
    ),
    createEnemies("jelly", 10, sectionTwoStartX, SECTION_TWO_LENGTH),
    createCollectibles("poison", 5, sectionTwoStartX, SECTION_TWO_LENGTH),
  );
}

function createEndbossSection() {
  return new Section(
    endbossSectionStartX,
    ENDBOSS_SECTION_LENGTH,
    createBackgrounds(
      ENDBOSS_SECTION_LENGTH,
      endbossSectionStartX,
      backgroundsDarkSection,
    ),
    [],
    [],
    endboss,
  );
}

function createSectionBackgrounds(sectionLength, startX, backgroundsArray) {
  return [
    ...createBackgrounds(sectionLength, startX, backgroundsArray),
    createSectionBarrier(startX, sectionLength),
  ];
}

function createSectionBarrier(startX, sectionLength) {
  return new Barrier(separatorPath, startX + sectionLength - 300, 500, 480);
}

function createBackgrounds(sectionLength, startX, backgroundsArray) {
  const backgrounds = [];
  const tileCount = Math.ceil(sectionLength / BG_TILE_WIDTH);

  for (let i = 0; i < tileCount; i++) {
    const tileX = startX + i * BG_TILE_WIDTH;
    const tileWidth = getBackgroundTileWidth(sectionLength, i);
    backgrounds.push(
      ...createBackgroundTile(backgroundsArray, tileX, tileWidth),
    );
  }

  return backgrounds;
}

function getBackgroundTileWidth(sectionLength, index) {
  const remainingWidth = sectionLength - index * BG_TILE_WIDTH;
  return Math.min(BG_TILE_WIDTH, remainingWidth);
}

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

function getEnemySpawnArea(count, startX, sectionLength) {
  const minX = startX + 500;
  const maxX = startX + sectionLength - 300;
  return {
    minX,
    spacing: count > 1 ? (maxX - minX) / (count - 1) : 0,
  };
}

function getEnemySpawnX(enemyArea, index) {
  return enemyArea.minX + index * enemyArea.spacing + randomNumber(120) - 60;
}

function createEnemy(sort, position_x, position_y) {
  if (sort === "puffer") {
    return new PufferFish(position_x, position_y);
  }
  if (sort === "jelly") {
    return new JellyFish(position_x, position_y);
  }
  return null;
}

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

function getCollectibleSpawnArea(startX, sectionLength) {
  return {
    minX: startX + 120,
    usableWidth: Math.max(200, sectionLength - 240),
  };
}

function createCollectible(sort, position_x, position_y) {
  if (sort === "coins") {
    return new Coins(position_x, position_y);
  }
  if (sort === "poison") {
    return new Poison(position_x, position_y);
  }
  return null;
}

function randomNumber(range) {
  return parseInt(Math.random() * range);
}
