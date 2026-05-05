const enemiesCount = 10;
const firstEnemyX = 500;
const lastEnemyX = 2300;
const level1 = new Level(
  createEnemies(10),
  new Endboss("img/Enemy/3 Final Enemy/2.floating/1.png", 3000, 100),
  [
    new Barrier("img/Background/Barrier/1.png", 0, 0, 350, 300),
    new Barrier("img/Background/Barrier/2.png", 200, 0, 350, 300),
    new Barrier("img/Background/Barrier/3.png", 400, 0, 350, 300),
  ],
  [
    new BackgroundObject("img/Background/Layers/3.Fondo 1/D.png", 0),
    new BackgroundObject("img/Background/Layers/4.Fondo 2/D.png", 0),
    new BackgroundObject("img/Background/Layers/2. Floor/D.png", 0),
    new BackgroundObject("img/Background/Layers/3.Fondo 1/D.png", 1703),
    new BackgroundObject("img/Background/Layers/4.Fondo 2/D.png", 1703),
    new BackgroundObject("img/Background/Layers/2. Floor/D.png", 1703),
  ],
  [
    new BackgroundWater("img/Background/Layers/5. Water/D.png", 0),
    new BackgroundWater("img/Background/Layers/5. Water/D.png", 1703),
  ],
);

function createEnemies(count) {
  let enemies = [];
  let spacing = (lastEnemyX - firstEnemyX) / count - 1;
  for (i = 0; i < count; i++) {
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

function randomNumber(range) {
  return parseInt(Math.random() * range);
}
