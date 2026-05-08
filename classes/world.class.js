class World {
  character = new Character();
  statusBars = [new LifeBar(), new PoisonBar(), new CoinBar()];
  throwableObjects = [];
  lastThrowAt = 0;
  level = level1;
  currentSection = null;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.keyboard = keyboard;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.currentSection = this.level.sections[0];
    this.draw();
    this.setWorld();
    this.run();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateSection();
    this.ctx.translate(this.camera_x, 0);

    this.drawArrayToMap(this.currentSection.backgrounds);
    this.drawArrayToMap(this.currentSection.enemies);
    this.drawArrayToMap(this.currentSection.collectibles);

    this.addToMap(this.character);

    this.drawArrayToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    this.drawArrayToMap(this.statusBars);

    requestAnimationFrame(() => this.draw());
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkBubbleCollision();
      this.checkCollectItems();
    }, 200);
  }

  updateSection() {
    this.level.sections.forEach((section) => {
      if (this.character.position_x >= section.startX) {
        this.currentSection = section;
      }
    });
  }

  spawnBubble(isFacingLeft) {
    const direction = isFacingLeft ? -1 : 1;
    const startOffsetX = direction !== 1 ? 0 : 220;
    let bubble = new ThrowableObject(
      this.character.position_x + startOffsetX,
      this.character.position_y + 100,
      direction,
    );
    this.throwableObjects.push(bubble);
  }

  checkCollision() {
    this.currentSection.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isAttacking) {
          enemy.hit(100);
          if (enemy.isDead()) {
            enemy.startDeath(enemy.randomImagesDieArray);
          }
        } else {
          this.character.hit(5);
          this.statusBars[0].setLifePercentage(this.character.energy);
          if (this.character.isDead(this.character)) {
            console.log("Try again!");
          }
        }
      }
      enemy.changeAnimation(enemy.randomImagesSwimArray);
    });

    this.currentSection.enemies = this.currentSection.enemies.filter(
      (enemy) => !enemy.shouldBeRemoved(),
    );
  }

  checkBubbleCollision() {
    const leftEdge = -this.camera_x;
    const rightEdge = -this.camera_x + this.canvas.width;
    this.throwableObjects.forEach((object) => {
      if (
        this.currentSection.endboss &&
        this.currentSection.endboss.isColliding(object)
      ) {
        console.log("hit");
        object.startRemove();
        this.currentSection.endboss.hit(20);
        if (this.currentSection.endboss.isDead(this.currentSection.endboss)) {
          this.currentSection.endboss.startDeath(
            this.currentSection.endboss.IMAGES_DEAD,
          );
        }
      } else if (
        object.position_y < 0 ||
        object.position_x + object.width < leftEdge ||
        object.position_x + object.width > rightEdge
      ) {
        object.startRemove();
      }
    });
    this.throwableObjects = this.throwableObjects.filter(
      (object) => !object.shouldBeRemoved(),
    );
  }

  checkCollectItems() {
    this.currentSection.collectibles.forEach((item) => {
      if (this.character.isColliding(item)) {
        if (item instanceof Coins) {
          item.isCollected = true;
          this.statusBars[2].setCoinPercentage(20);
        } else if (item instanceof Poison) {
          item.isCollected = true;
          this.statusBars[1].setPoisonPercentage(20);
        }
      }
    });

    this.currentSection.collectibles = this.currentSection.collectibles.filter(
      (item) => !item.isCollected,
    );
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
