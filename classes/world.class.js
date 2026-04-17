class World {
  character = new Character("img/Sharkie/1.IDLE/1.png", 20, 0);
  enemies = [
    new Enemy(
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
      400 + Math.random() * 200,
      Math.random() * 420,
    ),
    new Enemy(
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
      400 + Math.random() * 200,
      Math.random() * 420,
    ),
    new Enemy(
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
      400 + Math.random() * 200,
      Math.random() * 420,
    ),
  ];
  barriers = [
    new Barrier("img/Background/Barrier/1.png", 0, 0, 350, 300),
    new Barrier("img/Background/Barrier/2.png", 200, 0, 350, 300),
    new Barrier("img/Background/Barrier/3.png", 400, 0, 350, 300),
  ];
  backgrounds = [
    new BackgroundObject("img/Background/Layers/3.Fondo 1/D.png", 0),
    new BackgroundObject("img/Background/Layers/4.Fondo 2/D.png", 0),
    new BackgroundObject("img/Background/Layers/2. Floor/D.png", 0),
  ];

  backgroundWater = new BackgroundWater(
    "img/Background/Layers/5. Water/D.png",
    0,
  );

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMap(this.backgroundWater);
    this.barriers.forEach((barrier) => {
      this.addToMap(barrier);
    });
    this.backgrounds.forEach((background) => {
      this.addToMap(background);
    });
    this.addToMap(this.character);
    this.enemies.forEach((enemy) => {
      this.addToMap(enemy);
    });

    requestAnimationFrame(() => this.draw());
  }

  addToMap(movableObject) {
    this.ctx.drawImage(
      movableObject.image,
      movableObject.position_x,
      movableObject.position_y,
      movableObject.width,
      movableObject.height,
    );
  }
}
