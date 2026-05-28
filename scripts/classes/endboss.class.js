class Endboss extends Enemy {
  IMAGES_INTRO = [
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/1.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/2.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/3.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/4.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/5.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/6.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/7.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/8.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/9.png",
    "../../assets/img/Enemy/3 Final Enemy/1.Introduce/10.png",
  ];
  IMAGES_SWIM = [
    "../../assets/img/Enemy/3 Final Enemy/2.floating/1.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/2.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/3.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/4.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/5.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/6.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/7.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/8.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/9.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/10.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/11.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/12.png",
    "../../assets/img/Enemy/3 Final Enemy/2.floating/13.png",
  ];
  IMAGES_ATTACK = [
    "../../assets/img/Enemy/3 Final Enemy/Attack/1.png",
    "../../assets/img/Enemy/3 Final Enemy/Attack/2.png",
    "../../assets/img/Enemy/3 Final Enemy/Attack/3.png",
    "../../assets/img/Enemy/3 Final Enemy/Attack/4.png",
    "../../assets/img/Enemy/3 Final Enemy/Attack/5.png",
    "../../assets/img/Enemy/3 Final Enemy/Attack/6.png",
  ];
  IMAGES_DEAD = [
    "../../assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "../../assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "../../assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "../../assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "../../assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];
  path;
  position_x;
  position_y;
  startX;
  startY;
  width = 300;
  height = 250;
  rangeY = 55;
  speedY = 1.8;
  attackCooldown = 5000;
  attackSpeed = 10;
  returnSpeed = 6;
  retreatDistance = 120;
  movementState = "floating";
  attackStartedAt = Date.now();
  attackTargetX = null;
  retreatTargetX = null;
  attackRoarSound = new Audio("../../assets/audio/mooaarr.mp3");
  world;
  offset = {};

  constructor(position_x, position_y) {
    super();
    this.path = this.IMAGES_SWIM[0];
    this.position_x = position_x;
    this.position_y = position_y;
    this.startX = position_x;
    this.startY = position_y;
    this.loadImage();
    this.loadImages(this.IMAGES_INTRO);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.moveUpAndDown();
    this.offset = {
      top: 90,
      bottom: 20,
      right: 20,
      left: 20,
    };
    this.currentAnimation = this.IMAGES_SWIM;
    this.image = this.imageCache[this.IMAGES_SWIM[0]];

    this.startAnimation(() => this.currentAnimation, 200);
  }

  moveUpAndDown() {
    setInterval(() => {
      if (!this.world || this.world.gameState !== "running" || this.isStunned)
        return;
      if (!this.world.endbossIntroDone) return;
      if (this.world.isEndbossIntroActive || this.isDead()) return;

      if (this.movementState === "floating") {
        this.setAnimation(this.IMAGES_SWIM);
        this.position_y += this.speedY;
        const { minY, maxY } = this.getVerticalBounds();

        if (this.position_y >= maxY || this.position_y <= minY) {
          this.position_y = Math.max(minY, Math.min(maxY, this.position_y));
          this.speedY = -this.speedY;
        }

        if (Date.now() - this.attackStartedAt >= this.attackCooldown) {
          this.movementState = "attacking";
          this.attackTargetX = this.getAttackTargetX();
          this.retreatTargetX = this.getRetreatTargetX();
          this.setAnimation(this.IMAGES_ATTACK);
          this.attackRoarSound.currentTime = 0;
          this.attackRoarSound.muted = !this.world.soundEnabled;
          this.attackRoarSound.play();
        }
        return;
      }

      if (this.movementState === "attacking") {
        this.position_x -= this.attackSpeed;

        if (this.position_x <= this.attackTargetX) {
          this.position_x = this.attackTargetX;
          this.movementState = "returning";
          this.setAnimation(this.IMAGES_SWIM);
        }
        return;
      }

      if (this.movementState === "returning") {
        this.position_x += this.returnSpeed;

        if (this.position_x >= this.retreatTargetX) {
          this.position_x = this.retreatTargetX;
          this.startX = this.retreatTargetX;
          this.movementState = "floating";
          this.attackStartedAt = Date.now();
        }
      }
    }, 1000 / 60);
  }

  getAttackTargetX() {
    const section = this.getCurrentEndbossSection();
    if (!section) {
      return this.startX;
    }

    const leftVisibleX = this.getLeftVisibleX();
    return Math.max(section.startX, leftVisibleX);
  }

  getRetreatTargetX() {
    const section = this.getCurrentEndbossSection();
    if (!section) {
      return this.startX;
    }

    const sectionRightLimit = section.endX - this.width;
    return Math.min(sectionRightLimit, this.startX + this.retreatDistance);
  }

  getCurrentEndbossSection() {
    if (!this.world || !this.world.currentSection) {
      return null;
    }

    const section = this.world.currentSection;
    if (section.endboss !== this) {
      return null;
    }

    return section;
  }

  getVerticalBounds() {
    if (!this.world || !this.world.canvas) {
      return {
        minY: this.startY - this.rangeY,
        maxY: this.startY + this.rangeY,
      };
    }

    const minY = 0;
    const maxY = this.world.canvas.height - this.height;
    return { minY, maxY };
  }

  getLeftVisibleX() {
    if (!this.world) {
      return this.startX;
    }

    return -this.world.camera_x;
  }
}
