class World {
  character = new Character("img/Sharkie/1.IDLE/1.png", 50, 100);
  statusBars = [
    new LifeBar("img/Marcadores/Purple/100_ .png", 10, 0),
    new PoisonBar("img/Marcadores/Purple/0_.png", 10, 80),
    new CoinBar("img/Marcadores/Purple/0_ _1.png", 10, 40),
  ];
  level = level1;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.keyboard = keyboard;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.draw();
    this.setWorld();
    this.checkCollision();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollision() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBars[0].setLifePercentage(this.character.energy);
          if (this.character.isDead(this.character)) {
            console.log("Try again!");
          }
        }
      });
    }, 200);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawArrayToMap(this.level.backgroundWater);
    this.drawArrayToMap(this.level.backgrounds);
    this.ctx.translate(-this.camera_x, 0);
    this.drawArrayToMap(this.statusBars);
    this.ctx.translate(this.camera_x, 0);
    this.drawArrayToMap(this.level.enemies);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  drawArrayToMap(array) {
    array.forEach((element) => {
      this.addToMap(element);
    });
  }

  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }
    object.draw(this.ctx);
    //movableObject.drawFrame(this.ctx);
    this.ctx.stroke();
    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.position_x = movableObject.position_x * -1;
  }

  flipImageBack(movableObject) {
    movableObject.position_x = movableObject.position_x * -1;
    this.ctx.restore();
  }
}
