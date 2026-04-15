class World {
  character = new Character("img/Sharkie/1.IDLE/1.png", 120, 250, 150, 100);
  enemies = [
    new Enemy(
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
      500,
      250,
      150,
      100,
    ),
    new Enemy(
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
      550,
      250,
      150,
      100,
    ),
    new Enemy(
      "img/Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
      600,
      250,
      150,
      100,
    ),
  ];
  canvas;
  ctx;

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.character.image,
      this.character.position_x,
      this.character.position_y,
      this.character.width,
      this.character.height,
    );

    this.enemies.forEach((enemy) => {
      this.ctx.drawImage(
        enemy.image,
        enemy.position_x,
        enemy.position_y,
        enemy.width,
        enemy.height,
      );
    });

    requestAnimationFrame(() => this.draw());
  }
}
