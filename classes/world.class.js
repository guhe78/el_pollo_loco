class World {
  character = new Character();
  statusBars = [new LifeBar(), new PoisonBar(), new CoinBar()];
  throwableObjects = [];
  level = level1;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.keyboard = keyboard;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.THROW) {
      let bubble = new ThrowableObject(
        this.character.position_x + 220,
        this.character.position_y + 100,
      );
      this.throwableObjects.push(bubble);
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isAttacking) {
          enemy.hit(100);
          if (enemy.isDead()) {
            enemy.startDeath();
          }
        } else {
          this.character.hit(5);
          this.statusBars[0].setLifePercentage(this.character.energy);
          if (this.character.isDead(this.character)) {
            console.log("Try again!");
          }
        }
      }
      enemy.changeAnimation();
    });

    this.level.enemies = this.level.enemies.filter(
      (enemy) => !enemy.shouldBeRemoved(),
    );
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
    this.drawArrayToMap(this.level.endboss);
    this.addToMap(this.character);
    this.drawArrayToMap(this.throwableObjects);
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
