const enemiesCount = 10;
const firstEnemyX = 500;
const lastEnemyX = 2300;
const level1 = new Level([
  new Section(
    0,
    createBackgrounds(6000),
    createEnemies(10),
    createCollectibles(10),
  ),
  6000,
]);

function createBackgrounds(levelLength) {
  let backgrounds = [];
  const width = 1705;

  for (let x = 0; x < levelLength; x += width) {
    backgrounds.push(
      new BackgroundWater("img/Background/Layers/5. Water/L.png", x),
    );
    backgrounds.push(
      new BackgroundObject("img/Background/Layers/3.Fondo 1/D.png", x),
    );
    backgrounds.push(
      new BackgroundObject("img/Background/Layers/4.Fondo 2/D.png", x),
    );
    backgrounds.push(
      new BackgroundObject("img/Background/Layers/2. Floor/L.png", x),
    );
  }

  return backgrounds;
}

function createEnemies(count) {
  let enemies = [];
  let spacing = (lastEnemyX - firstEnemyX) / (count - 1);
  for (let i = 0; i < count; i++) {
    const position_x = firstEnemyX + i * spacing + randomNumber(120) - 60;
    const position_y = randomNumber(420);
    if (randomNumber(2) === 0) {
      enemies.push(new PufferFish(position_x, position_y));
    } else {
      enemies.push(new JellyFish(position_x, position_y));
    }
  }
  return enemies;
}

function createCollectibles(count) {
  let collectibles = [];
  let half = count / 2;
  for (let i = 0; i < count; i++) {
    const position_x = randomNumber(2500);
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
