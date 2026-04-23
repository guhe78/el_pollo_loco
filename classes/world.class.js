class World {
  character = new Character("img/Sharkie/1.IDLE/1.png", 50, 0);
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
          console.log("Collision with character");
          this.character.hit();
          console.log("Collision with enemy: ", this.character.energy);
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
    this.level.backgroundWater.forEach((water) => {
      this.addToMap(water);
    });
    this.level.backgrounds.forEach((background) => {
      this.addToMap(background);
    });
    this.addToMap(this.character);
    this.level.enemies.forEach((enemy) => {
      this.addToMap(enemy);
    });
    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);
    movableObject.drawFrame(this.ctx);
    this.ctx.stroke();
    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
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
