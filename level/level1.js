const BG_TILE_WIDTH = 3840 / 2.25;

const SECTION_ONE_LENGTH = BG_TILE_WIDTH * 2;
const SECTION_TWO_LENGTH = BG_TILE_WIDTH * 2;
const ENDBOSS_SECTION_LENGTH = BG_TILE_WIDTH;

const sectionOneStartX = 0;
const sectionTwoStartX = sectionOneStartX + SECTION_ONE_LENGTH;
const endbossSectionStartX = sectionTwoStartX + SECTION_TWO_LENGTH;

const backgroundsLightSection = [
  "img/Background/Layers/5. Water/L.png",
  "img/Background/Layers/3.Fondo 1/L.png",
  "img/Background/Layers/4.Fondo 2/L.png",
  "img/Background/Layers/2. Floor/L.png",
];

const backgroundsDarkSection = [
  "img/Background/Layers/5. Water/D.png",
  "img/Background/Layers/3.Fondo 1/D.png",
  "img/Background/Layers/4.Fondo 2/D.png",
  "img/Background/Layers/2. Floor/D.png",
];

const separatorPath = "img/Background/Barrier/3.png";

const endboss = new Endboss(
  endbossSectionStartX + ENDBOSS_SECTION_LENGTH - 500,
  120,
);

const level1 = new Level([
  new Section(
    sectionOneStartX,
    SECTION_ONE_LENGTH,
    [
      ...createBackgrounds(
        SECTION_ONE_LENGTH,
        sectionOneStartX,
        backgroundsLightSection,
      ),
      new Barrier(
        separatorPath,
        sectionOneStartX + SECTION_ONE_LENGTH - 300,
        500,
        480,
      ),
    ],
    createEnemies(10, sectionOneStartX, SECTION_ONE_LENGTH),
    createCollectibles(10, sectionOneStartX, SECTION_ONE_LENGTH),
  ),
  new Section(
    sectionTwoStartX,
    SECTION_TWO_LENGTH,
    [
      ...createBackgrounds(
        SECTION_TWO_LENGTH,
        sectionTwoStartX,
        backgroundsDarkSection,
      ),
      new Barrier(
        separatorPath,
        sectionTwoStartX + SECTION_TWO_LENGTH - 300,
        500,
        480,
      ),
    ],
    createEnemies(10, sectionTwoStartX, SECTION_TWO_LENGTH),
    createCollectibles(10, sectionTwoStartX, SECTION_TWO_LENGTH),
  ),
  new Section(
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
  ),
]);

function createBackgrounds(sectionLength, startX, backgroundsArray) {
  const backgrounds = [];
  const tileCount = Math.ceil(sectionLength / BG_TILE_WIDTH);

  for (let i = 0; i < tileCount; i++) {
    const x = startX + i * BG_TILE_WIDTH;
    const remainingWidth = sectionLength - i * BG_TILE_WIDTH;
    const tileWidth = Math.min(BG_TILE_WIDTH, remainingWidth);

    const water = new BackgroundWater(backgroundsArray[0], x);
    const fondo1 = new BackgroundObject(backgroundsArray[1], x);
    const fondo2 = new BackgroundObject(backgroundsArray[2], x);
    const floor = new BackgroundObject(backgroundsArray[3], x);

    water.width = tileWidth;
    fondo1.width = tileWidth;
    fondo2.width = tileWidth;
    floor.width = tileWidth;

    backgrounds.push(water, fondo1, fondo2, floor);
  }

  return backgrounds;
}

function createEnemies(count, startX, sectionLength) {
  const enemies = [];
  const minX = startX + 300;
  const maxX = startX + sectionLength - 300;
  const spacing = count > 1 ? (maxX - minX) / (count - 1) : 0;

  for (let i = 0; i < count; i++) {
    const position_x = minX + i * spacing + randomNumber(120) - 60;
    const position_y = randomNumber(420);

    if (randomNumber(2) === 0) {
      enemies.push(new PufferFish(position_x, position_y));
    } else {
      enemies.push(new JellyFish(position_x, position_y));
    }
  }

  return enemies;
}

function createCollectibles(count, startX, sectionLength) {
  const collectibles = [];
  const half = count / 2;
  const minX = startX + 120;
  const usableWidth = Math.max(200, sectionLength - 240);

  for (let i = 0; i < count; i++) {
    const position_x = minX + randomNumber(usableWidth);
    const position_y = randomNumber(400);

    if (i < half) {
      collectibles.push(new Coins(position_x, position_y));
    } else {
      collectibles.push(new Poison(position_x, position_y));
    }
  }

  return collectibles;
}

function randomNumber(range) {
  return parseInt(Math.random() * range);
}
