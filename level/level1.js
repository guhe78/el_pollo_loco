const level1 = new Level(
  [new Enemy(), new Enemy(), new Enemy()],
  [new Endboss("img/Enemy/3 Final Enemy/2.floating/1.png", 2500, 0)],
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
