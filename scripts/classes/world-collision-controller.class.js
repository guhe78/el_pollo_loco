class WorldCollisionController {
  /**
   * Creates collision controller for World.
   * @param {*} world
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Processes enemy and endboss collision checks.
   */
  checkCollision() {
    const w = this.world;
    w.currentSection.enemies.forEach((enemy) => {
      this.handleEnemyCollision(enemy);
      enemy?.changeAnimation(enemy.randomImagesSwimArray);
    });

    this.handleEndbossCollision();
    w.currentSection.enemies = w.currentSection.enemies.filter((enemy) => !enemy.shouldBeRemoved());
  }

  /**
   * Handles character collision interaction with one enemy.
   * @param {*} enemy
   */
  handleEnemyCollision(enemy) {
    const w = this.world;
    if (!enemy || enemy.isPendingSlapKill) return;
    if (!w.character.isColliding(enemy)) return;

    if (w.character.isAttacking && enemy.isStunned) {
      this.handleEnemySlapKill(enemy);
      return;
    }

    if (!w.character.isAttacking && !enemy.isStunned) {
      this.applyCharacterDamage();
    }
  }

  /**
   * Handles character collision interaction with endboss.
   */
  handleEndbossCollision() {
    const w = this.world;
    const endboss = w.currentSection.endboss;
    if (!endboss || endboss.isDead()) return;
    if (!w.character.isColliding(endboss)) return;

    if (w.character.isAttacking && endboss.isStunned) {
      this.handleEndbossSlapHit(endboss);
      return;
    }

    if (!w.character.isAttacking && !endboss.isStunned) {
      this.applyCharacterDamage();
    }
  }

  /**
   * Applies damage to character and updates life UI.
   */
  applyCharacterDamage() {
    const w = this.world;
    w.character.auaSound.play();
    w.character.hit(5);
    w.statusBars[0].setLifePercentage(w.character.energy);
    if (w.character.isDead()) {
      w.gameOver();
    }
  }

  /**
   * Resolves slap kill logic for normal enemies.
   * @param {*} enemy
   */
  handleEnemySlapKill(enemy) {
    const w = this.world;
    if (enemy.isPendingSlapKill || enemy.isDead() || enemy.removeStartedAt !== null) {
      return;
    }

    enemy.isPendingSlapKill = true;
    enemy.energy = 0;
    enemy.startDeath(enemy.randomImagesDieArray);
    w.character.highscore += 10;
    this.playHitSoundAfterSlap();
    enemy.isPendingSlapKill = false;
  }

  /**
   * Resolves slap hit logic for the endboss.
   * @param {*} endboss
   */
  handleEndbossSlapHit(endboss) {
    if (endboss.isPendingSlapHit || endboss.isDead()) return;

    endboss.isPendingSlapHit = true;
    endboss.hit(10);
    this.playHitSoundAfterSlap();
    this.finishEndbossIfDead(endboss);
    this.resetPendingSlapHitAfterAttack(endboss);
  }

  /**
   * Applies death/victory flow after a slap hit.
   * @param {*} endboss
   */
  finishEndbossIfDead(endboss) {
    if (!endboss.isDead()) return;

    const w = this.world;
    endboss.startDeath(endboss.IMAGES_DEAD);
    w.character.highscore += 100;
    w.victory();
  }

  /**
   * Unlocks pending slap hit after one attack animation duration.
   * @param {*} endboss
   */
  resetPendingSlapHitAfterAttack(endboss) {
    const w = this.world;
    const attackDuration = w.character.calculateAnimationDuration(w.character.IMAGES_ATTACK);
    setTimeout(() => {
      endboss.isPendingSlapHit = false;
    }, attackDuration);
  }

  /**
   * Plays hit sound delayed until slap sound is complete.
   */
  playHitSoundAfterSlap() {
    const w = this.world;
    const delay = w.character.getDelayUntilSlapSoundFinished();
    setTimeout(() => {
      w.character.hitSound.currentTime = 0;
      w.character.hitSound.play();
    }, delay);
  }

  /**
   * Handles bubble collisions and bubble cleanup.
   */
  checkBubbleCollision() {
    const w = this.world;
    const leftEdge = -w.camera_x;
    const rightEdge = -w.camera_x + w.canvas.width;

    w.throwableObjects.forEach((object) => {
      this.handleBubbleEnemyCollision(object);
      if (this.handleBubbleEndbossCollision(object)) return;
      if (this.isBubbleOutsideView(object, leftEdge, rightEdge)) {
        object.startRemove();
      }
    });

    w.throwableObjects = w.throwableObjects.filter((object) => !object.shouldBeRemoved());
  }

  /**
   * Applies bubble stun collision against enemies.
   * @param {*} object
   */
  handleBubbleEnemyCollision(object) {
    const w = this.world;
    w.currentSection.enemies.forEach((enemy) => {
      if (enemy.isColliding(object)) {
        enemy.stun();
        object.startRemove();
      }
    });
  }

  /**
   * Applies bubble collision logic against endboss.
   * @param {*} object
   * @returns {*} Result value.
   */
  handleBubbleEndbossCollision(object) {
    const w = this.world;
    const endboss = w.currentSection.endboss;
    if (!endboss || endboss.isDead() || !endboss.isColliding(object)) {
      return false;
    }

    object.startRemove();
    endboss.stun();
    if (endboss.isDead()) {
      endboss.startDeath(endboss.IMAGES_DEAD);
      w.victory();
    }

    return true;
  }

  /**
   * Checks if a bubble is outside current visible area.
   * @param {*} object
   * @param {*} leftEdge
   * @param {*} rightEdge
   * @returns {*} Result value.
   */
  isBubbleOutsideView(object, leftEdge, rightEdge) {
    return (
      object.position_y < 0 ||
      object.position_x + object.width < leftEdge ||
      object.position_x + object.width > rightEdge
    );
  }

  /**
   * Handles collectible pickups and inventory bars.
   */
  checkCollectItems() {
    const world = this.world;
    world.currentSection.collectibles.forEach((item) => this.handleCollectiblePickup(item));

    world.currentSection.collectibles = world.currentSection.collectibles.filter(
      (item) => !item.isCollected,
    );
  }

  /**
   * Applies pickup effects for a single collectible on collision.
   * @param {*} item
   */
  handleCollectiblePickup(item) {
    const world = this.world;
    if (!world.character.isColliding(item)) return;

    if (item instanceof Coins) {
      item.isCollected = true;
      world.statusBars[2].setCoinPercentage(20);
    } else if (item instanceof Poison) {
      item.isCollected = true;
      world.statusBars[1].setPoisonPercentage(20);
    }

    world.character.highscore += 5;
    world.character.blingSound.play();
  }
}
