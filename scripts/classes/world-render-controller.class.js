class WorldRenderController {
  /**
   * Creates render controller for World.
   * @param {*} world
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Draws one render frame.
   */
  drawFrame() {
    const w = this.world;
    w.ctx.clearRect(0, 0, w.canvas.width, w.canvas.height);
    w.updateSectionIfRunning();
    this.drawWorldLayer();
    this.drawHudLayer();
  }

  /**
   * Draws all world-space elements with camera transform.
   */
  drawWorldLayer() {
    const w = this.world;
    w.ctx.translate(w.camera_x, 0);
    this.drawBackgrounds();
    this.drawCurrentSectionObjects();
    this.drawForegroundObjects();
    w.ctx.translate(-w.camera_x, 0);
  }

  /**
   * Draws section backgrounds in proper layering order.
   */
  drawBackgrounds() {
    const w = this.world;
    w.level.sections.forEach((section) => {
      this.drawArrayToMap(
        section.backgrounds.filter(
          (background) => !(background instanceof Barrier),
        ),
      );
    });

    w.level.sections.forEach((section) => {
      this.drawArrayToMap(
        section.backgrounds.filter(
          (background) => background instanceof Barrier,
        ),
      );
    });
  }

  /**
   * Draws enemies, collectibles and endboss of current section.
   */
  drawCurrentSectionObjects() {
    const w = this.world;
    this.drawArrayToMap(w.currentSection.enemies);
    this.drawArrayToMap(w.currentSection.collectibles);
    if (w.currentSection.endboss) {
      this.addToMap(w.currentSection.endboss);
    }
  }

  /**
   * Draws character and active throwable objects.
   */
  drawForegroundObjects() {
    const w = this.world;
    this.addToMap(w.character);
    this.drawArrayToMap(w.throwableObjects);
  }

  /**
   * Draws HUD elements on screen-space.
   */
  drawHudLayer() {
    const w = this.world;
    this.drawArrayToMap(w.statusBars);
    this.drawEndbossLifeBar();
  }

  /**
   * Draws and updates the endboss life bar HUD.
   */
  drawEndbossLifeBar() {
    const w = this.world;
    const endboss = w.currentSection?.endboss;
    if (!endboss || w.gameState !== "running") return;

    const characterLifeBar = w.statusBars[0];
    w.endbossLifeBar.setLifePercentage(endboss.energy);
    w.endbossLifeBar.position_y = characterLifeBar.position_y;
    w.endbossLifeBar.setPositionX(w.canvas.width - 10 - w.endbossLifeBar.width);
    this.addToMap(w.endbossLifeBar);
  }

  /**
   * Draws all objects from an array to the canvas.
   * @param {*} array
   */
  drawArrayToMap(array) {
    array.forEach((element) => {
      this.addToMap(element);
    });
  }

  /**
   * Draws a single object including direction flip and stun effect.
   * @param {*} object
   */
  addToMap(object) {
    const w = this.world;
    if (object.otherDirection) {
      this.flipImage(object);
    }
    if (object.isStunned) {
      w.ctx.globalAlpha = Math.sin(Date.now() / 100) > 0 ? 1 : 0.5;
    }
    object.draw(w.ctx);
    w.ctx.globalAlpha = 1;
    w.ctx.stroke();
    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  /**
   * Flips render context for mirrored drawing.
   * @param {*} movableObject
   */
  flipImage(movableObject) {
    const w = this.world;
    w.ctx.save();
    w.ctx.translate(movableObject.width, 0);
    w.ctx.scale(-1, 1);
    movableObject.position_x *= -1;
  }

  /**
   * Restores render context after mirrored drawing.
   * @param {*} movableObject
   */
  flipImageBack(movableObject) {
    const w = this.world;
    movableObject.position_x *= -1;
    w.ctx.restore();
  }
}
