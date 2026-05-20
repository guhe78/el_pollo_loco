class World {
  character = new Character();
  statusBars = [new LifeBar(), new PoisonBar(), new CoinBar()];
  throwableObjects = [];
  lastThrowAt = 0;
  level;
  currentSection = null;
  keyboard;
  camera_x = 0;
  gameState;

  constructor(canvas, keyboard) {
    this.keyboard = keyboard;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.level = createLevel();
    this.currentSection = this.level.sections[0];
    this.overlayManager = new OverlayManager();
    this.setWorld();
    this.setGameState("startMenu");
    this.draw();
    this.run();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.gameState === "running") {
      this.updateSection();
    }

    this.ctx.translate(this.camera_x, 0);
    this.level.sections.forEach((section) =>
      this.drawArrayToMap(
        section.backgrounds.filter((b) => !(b instanceof Barrier)),
      ),
    );
    this.level.sections.forEach((section) =>
      this.drawArrayToMap(
        section.backgrounds.filter((b) => b instanceof Barrier),
      ),
    );
    this.drawArrayToMap(this.currentSection.enemies);
    this.drawArrayToMap(this.currentSection.collectibles);

    if (this.currentSection.endboss) {
      this.addToMap(this.currentSection.endboss);
    }

    this.addToMap(this.character);
    this.drawArrayToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.drawArrayToMap(this.statusBars);

    requestAnimationFrame(() => this.draw());
  }

  startGame() {
    this.setGameState("running");
    this.overlayManager.hide();
  }

  restartGame() {
    this.character.stop();
    this.camera_x = 0;
    this.level = createLevel();
    this.character = new Character();
    this.statusBars = [new LifeBar(), new PoisonBar(), new CoinBar()];
    this.throwableObjects = [];
    this.currentSection = this.level.sections[0];
    this.setWorld();
    this.startGame();
  }

  run() {
    setInterval(() => {
      if (this.gameState !== "running") return;

      this.checkCollision();
      this.checkBubbleCollision();
      this.checkCollectItems();
    }, 200);
  }

  setWorld() {
    this.character.world = this;
    this.level.sections.forEach((section) => {
      section.enemies.forEach((enemy) => {
        enemy.world = this;
      });
      if (section.endboss) {
        section.endboss.world = this;
      }
    });
  }

  updateSection() {
    const x = this.character.position_x;
    const lastSection = this.level.sections[this.level.sections.length - 1];

    this.level.sections.forEach((section) => {
      if (x >= section.startX && x < section.endX) {
        this.currentSection = section;
      }
    });

    if (x >= lastSection.startX) {
      this.currentSection = lastSection;
    }
  }

  togglePause() {
    if (this.gameState === "running") {
      this.setGameState("paused");
    } else if (this.gameState === "paused") {
      this.setGameState("running");
    }
  }

  startMenu() {
    this.setGameState("startMenu");
  }

  gameOver() {
    this.setGameState("gameover");
  }

  victory() {
    this.setGameState("victory");
  }

  setGameState(state) {
    this.gameState = state;

    if (state === "running") {
      this.overlayManager.hide();
      return;
    }

    const template = states[state];
    this.overlayManager.show(typeof template === "function" ? template() : "");
  }

  spawnBubble(isFacingLeft) {
    if (this.gameState !== "running") {
      return;
    }

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
          this.character.hitSound.play();
          if (enemy.isDead()) {
            enemy.startDeath(enemy.randomImagesDieArray);
          }
        } else {
          this.character.auaSound.play();
          this.character.hit(5);

          this.statusBars[0].setLifePercentage(this.character.energy);

          if (this.character.isDead()) {
            this.gameOver();
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
        this.character.hitSound.play();
        object.startRemove();

        this.currentSection.endboss.hit(20);
        if (this.currentSection.endboss.isDead()) {
          this.currentSection.endboss.startDeath(
            this.currentSection.endboss.IMAGES_DEAD,
          );

          this.victory();
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
        this.character.blingSound.play();
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

    this.ctx.stroke();

    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  flipImage(movableObject) {
    this.ctx.save();

    this.ctx.translate(movableObject.width, 0);

    this.ctx.scale(-1, 1);

    movableObject.position_x *= -1;
  }

  flipImageBack(movableObject) {
    movableObject.position_x *= -1;

    this.ctx.restore();
  }
}
