const BG_TILE_WIDTH = 3840 / 2.25; // 1706.67
const SECTION_LENGTH = BG_TILE_WIDTH * 2; // 3413
const ENDBOSS_SECTION_LENGTH = BG_TILE_WIDTH; // 1706
const LEVEL_LENGTH = SECTION_LENGTH * 2 + ENDBOSS_SECTION_LENGTH;

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

const backgroundsEndbossSection = "img/Background/Layers/5. Water/D.png";
const separatorPath = "img/Background/Barrier/3.png";

const endboss = new Endboss(7400, 120);

const level1 = new Level(
  [
    new Section(
      0,
      [
        ...createBackgrounds(SECTION_LENGTH, 0, backgroundsLightSection),
        new Barrier(separatorPath, SECTION_LENGTH - 300, 500, 480),
      ],
      createEnemies(10, 0, SECTION_LENGTH),
      createCollectibles(10, 0, SECTION_LENGTH),
    ),
    new Section(
      SECTION_LENGTH,
      [
        ...createBackgrounds(
          SECTION_LENGTH,
          SECTION_LENGTH,
          backgroundsDarkSection,
        ),
        new Barrier(separatorPath, SECTION_LENGTH * 2 - 300, 500, 480),
      ],
      createEnemies(10, SECTION_LENGTH, SECTION_LENGTH),
      createCollectibles(10, SECTION_LENGTH, SECTION_LENGTH),
    ),
    new Section(
      SECTION_LENGTH * 2,
      [createEndbossBackground()],
      [],
      [],
      endboss,
    ),
  ],
  LEVEL_LENGTH,
);

function createBackgrounds(sectionLength, startX, backgroundsArray) {
  const backgrounds = [];
  const width = BG_TILE_WIDTH;

  for (let x = startX; x < startX + sectionLength; x += width) {
    backgrounds.push(new BackgroundWater(backgroundsArray[0], x));
    backgrounds.push(new BackgroundObject(backgroundsArray[1], x));
    backgrounds.push(new BackgroundObject(backgroundsArray[2], x));
    backgrounds.push(new BackgroundObject(backgroundsArray[3], x));
  }

  return backgrounds;
}

function createEndbossBackground() {
  return new BackgroundWater(backgroundsEndbossSection, SECTION_LENGTH * 2);
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
