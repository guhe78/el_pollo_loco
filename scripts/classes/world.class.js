class World {
  character = new Character();
  statusBars = [new LifeBar(), new PoisonBar(), new CoinBar()];
  endbossLifeBar = new EndbossLifeBar();
  throwableObjects = [];
  lastThrowAt = 0;
  level;
  currentSection = null;
  keyboard;
  camera_x = 0;
  gameState;
  isEndbossIntroActive = false;
  endbossIntroDone = false;
  menuReturnState = "startMenu";
  soundEnabled = true;

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
    this.drawEndbossLifeBar();

    requestAnimationFrame(() => this.draw());
  }

  startGame() {
    this.setGameState("running");
    this.overlayManager.hide();
  }

  restartGame() {
    this.isEndbossIntroActive = false;
    this.endbossIntroDone = false;
    this.character.stop();
    this.camera_x = 0;
    this.level = createLevel();
    this.character = new Character();
    this.statusBars = [new LifeBar(), new PoisonBar(), new CoinBar()];
    this.endbossLifeBar = new EndbossLifeBar();
    this.throwableObjects = [];
    this.currentSection = this.level.sections[0];
    this.setWorld();
    this.setSoundEnabled(this.soundEnabled);
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
    const previousSection = this.currentSection;
    const lastSection = this.level.sections[this.level.sections.length - 1];

    this.level.sections.forEach((section) => {
      if (x >= section.startX && x < section.endX) {
        this.currentSection = section;
      }
    });

    if (x >= lastSection.startX) {
      this.currentSection = lastSection;
    }

    const enteredNewSection = previousSection !== this.currentSection;
    if (
      enteredNewSection &&
      this.currentSection.endboss &&
      !this.endbossIntroDone
    ) {
      this.startEndbossIntro();
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
    setTimeout(() => {
      this.setGameState("gameover");
    }, 3000);
  }

  victory() {
    this.character.isAttacking = false;
    this.character.isThrowing = false;
    this.character.setAnimation(this.character.IMAGES_IDLE);
    this.setGameState("victoryTransition");
    setTimeout(() => {
      this.setGameState("victory");
    }, 3000);
  }

  showHowTo() {
    if (this.gameState === "paused" || this.gameState === "startMenu") {
      this.menuReturnState = this.gameState;
    }
    this.setGameState("howto");
  }

  showSettings() {
    if (this.gameState === "paused" || this.gameState === "startMenu") {
      this.menuReturnState = this.gameState;
    }
    this.setGameState("settings");
  }

  closeOverlayMenu() {
    this.setGameState(this.menuReturnState);
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
    const sounds = [
      this.character.blubSound,
      this.character.slapSound,
      this.character.auaSound,
      this.character.blingSound,
      this.character.hitSound,
    ];
    sounds.forEach((audio) => {
      if (!audio) return;
      audio.muted = !enabled;
    });
  }

  setGameState(state) {
    this.gameState = state;
    const isInGameState =
      state === "running" ||
      state === "paused" ||
      state === "victoryTransition";
    document.body.classList.toggle("game-running", isInGameState);

    if (state === "running") {
      this.overlayManager.hide();
      return;
    }

    if (state === "victoryTransition") {
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
      if (!enemy) return;
      if (enemy.isPendingSlapKill) return;

      if (this.character.isColliding(enemy)) {
        if (this.character.isAttacking && enemy.isStunned) {
          this.handleEnemySlapKill(enemy);
        } else if (!this.character.isAttacking) {
          if (!enemy.isStunned) {
            this.character.auaSound.play();
            this.character.hit(5);
            this.statusBars[0].setLifePercentage(this.character.energy);
            if (this.character.isDead()) {
              this.gameOver();
            }
          }
        }
      }

      enemy.changeAnimation(enemy.randomImagesSwimArray);
    });

    if (this.currentSection.endboss) {
      const endboss = this.currentSection.endboss;

      if (!endboss.isDead() && this.character.isColliding(endboss)) {
        if (this.character.isAttacking && endboss.isStunned) {
          this.handleEndbossSlapHit(endboss);
        } else if (!this.character.isAttacking && !endboss.isStunned) {
          this.character.auaSound.play();
          this.character.hit(5);
          this.statusBars[0].setLifePercentage(this.character.energy);

          if (this.character.isDead()) {
            this.gameOver();
          }
        }
      }
    }

    this.currentSection.enemies = this.currentSection.enemies.filter(
      (enemy) => !enemy.shouldBeRemoved(),
    );
  }

  handleEnemySlapKill(enemy) {
    if (
      enemy.isPendingSlapKill ||
      enemy.isDead() ||
      enemy.removeStartedAt !== null
    )
      return;

    enemy.isPendingSlapKill = true;

    enemy.energy = 0;
    enemy.startDeath(enemy.randomImagesDieArray);
    this.character.highscore += 10;
    this.playHitSoundAfterSlap();
    enemy.isPendingSlapKill = false;
  }

  handleEndbossSlapHit(endboss) {
    if (endboss.isPendingSlapHit || endboss.isDead()) return;

    endboss.isPendingSlapHit = true;

    endboss.hit(10);
    this.playHitSoundAfterSlap();

    if (endboss.isDead()) {
      endboss.startDeath(endboss.IMAGES_DEAD);
      this.character.highscore += 100;
      this.victory();
    }

    const attackDuration = this.character.calculateAnimationDuration(
      this.character.IMAGES_ATTACK,
    );
    setTimeout(() => {
      endboss.isPendingSlapHit = false;
    }, attackDuration);
  }

  playHitSoundAfterSlap() {
    const delay = this.character.getDelayUntilSlapSoundFinished();
    setTimeout(() => {
      this.character.hitSound.currentTime = 0;
      this.character.hitSound.play();
    }, delay);
  }

  checkBubbleCollision() {
    const leftEdge = -this.camera_x;
    const rightEdge = -this.camera_x + this.canvas.width;

    this.throwableObjects.forEach((object) => {
      this.currentSection.enemies.forEach((enemy) => {
        if (enemy.isColliding(object)) {
          enemy.stun();
          object.startRemove();
        }
      });
      if (
        this.currentSection.endboss &&
        !this.currentSection.endboss.isDead() &&
        this.currentSection.endboss.isColliding(object)
      ) {
        object.startRemove();

        this.currentSection.endboss.stun();
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
        this.character.highscore += 5;
        this.character.blingSound.play();
      }
    });

    this.currentSection.collectibles = this.currentSection.collectibles.filter(
      (item) => !item.isCollected,
    );
  }

  drawEndbossLifeBar() {
    const endboss = this.currentSection?.endboss;
    if (!endboss || this.gameState !== "running") return;

    const characterLifeBar = this.statusBars[0];
    this.endbossLifeBar.setLifePercentage(endboss.energy);
    this.endbossLifeBar.position_y = characterLifeBar.position_y;
    this.endbossLifeBar.setPositionX(
      this.canvas.width - 10 - this.endbossLifeBar.width,
    );
    this.addToMap(this.endbossLifeBar);
  }

  startEndbossIntro() {
    const endboss = this.currentSection.endboss;
    if (!endboss) return;

    this.endbossIntroDone = true;
    this.isEndbossIntroActive = true;

    const targetY = endboss.position_y;
    const introDiveY = Math.max(0, targetY - 70);
    const holdBeforePanMs = 900;

    if (endboss.animationInterval) {
      clearInterval(endboss.animationInterval);
      endboss.animationInterval = null;
    }

    endboss.currentAnimation = endboss.IMAGES_INTRO;
    endboss.currentImage = 0;

    const setIntroFrame = (index) => {
      const frameIndex = Math.max(
        0,
        Math.min(index, endboss.IMAGES_INTRO.length - 1),
      );
      endboss.currentImage = frameIndex;
      endboss.image = endboss.imageCache[endboss.IMAGES_INTRO[frameIndex]];
    };

    endboss.position_y = -endboss.height;
    setIntroFrame(0);
    const levelMinCameraX = Math.round(
      Math.min(0, -this.level.levelEndX + this.canvas.width),
    );
    const sectionMinCameraX = Math.round(
      Math.min(0, -this.currentSection.endX + this.canvas.width),
    );
    const sectionMaxCameraX = Math.round(
      Math.min(0, -this.currentSection.startX),
    );

    const rawEndbossCameraX = Math.round(
      Math.min(
        0,
        -endboss.position_x + this.canvas.width / 2 - endboss.width / 2,
      ),
    );
    const endbossCameraX = Math.max(levelMinCameraX, rawEndbossCameraX);
    const rawCharacterCameraX = Math.round(
      Math.min(0, -this.character.position_x + this.character.cameraOffsetX),
    );
    const characterCameraX = Math.max(
      sectionMinCameraX,
      Math.min(sectionMaxCameraX, rawCharacterCameraX),
    );

    const panToEndboss = setInterval(() => {
      setIntroFrame(0);
      const diff = endbossCameraX - this.camera_x;
      if (Math.abs(diff) < 5) {
        this.camera_x = endbossCameraX;
        clearInterval(panToEndboss);

        const introFall = setInterval(() => {
          endboss.position_y += 8;

          const fallProgress =
            (endboss.position_y + endboss.height) /
            (introDiveY + endboss.height);
          const introFrameIndex = Math.floor(
            Math.max(0, Math.min(1, fallProgress)) *
              (endboss.IMAGES_INTRO.length - 1),
          );
          setIntroFrame(introFrameIndex);

          if (endboss.position_y >= introDiveY) {
            endboss.position_y = introDiveY;
            setIntroFrame(endboss.IMAGES_INTRO.length - 1);
            clearInterval(introFall);

            const swimToStart = setInterval(() => {
              setIntroFrame(endboss.IMAGES_INTRO.length - 1);
              const deltaY = targetY - endboss.position_y;
              if (Math.abs(deltaY) < 0.8) {
                endboss.position_y = targetY;
                clearInterval(swimToStart);
                setTimeout(() => {
                  const panToCharacter = setInterval(() => {
                    setIntroFrame(endboss.IMAGES_INTRO.length - 1);
                    const d = characterCameraX - this.camera_x;
                    if (Math.abs(d) < 2) {
                      this.camera_x = characterCameraX;
                      clearInterval(panToCharacter);
                      endboss.setAnimation(endboss.IMAGES_SWIM);
                      endboss.startAnimation(
                        () => endboss.currentAnimation,
                        200,
                      );
                      this.isEndbossIntroActive = false;
                    } else {
                      this.camera_x += d * 0.012;
                    }
                  }, 1000 / 60);
                }, holdBeforePanMs);
              } else {
                endboss.position_y += deltaY * 0.12;
              }
            }, 1000 / 60);
          }
        }, 1000 / 60);
      } else {
        this.camera_x += diff * 0.04;
      }
    }, 1000 / 60);
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

    if (object.isStunned) {
      this.ctx.globalAlpha = Math.sin(Date.now() / 100) > 0 ? 1 : 0.5;
    }

    object.draw(this.ctx);
    this.ctx.globalAlpha = 1;
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
