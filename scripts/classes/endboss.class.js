class Endboss extends Enemy {
  IMAGES_INTRO = [
    "assets/img/Enemy/3 Final Enemy/1.Introduce/1.png",
    "assets/img/Enemy/3 Final Enemy/1.Introduce/2.png",
    "assets/img/Enemy/3 Final Enemy/1.Introduce/3.png",
    "assets/img/Enemy/3 Final Enemy/1.Introduce/4.png",
    "assets/img/Enemy/3 Final Enemy/1.Introduce/5.png",
    "assets/img/Enemy/3 Final Enemy/1.Introduce/6.png",
    "assets/img/Enemy/3 Final Enemy/1.Introduce/7.png",
    "assets/img/Enemy/3 Final Enemy/1.Introduce/8.png",
    "assets/img/Enemy/3 Final Enemy/1.Introduce/9.png",
    "assets/img/Enemy/3 Final Enemy/1.Introduce/10.png",
  ];
  IMAGES_SWIM = [
    "assets/img/Enemy/3 Final Enemy/2.floating/1.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/2.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/3.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/4.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/5.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/6.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/7.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/8.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/9.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/10.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/11.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/12.png",
    "assets/img/Enemy/3 Final Enemy/2.floating/13.png",
  ];
  IMAGES_ATTACK = [
    "assets/img/Enemy/3 Final Enemy/Attack/1.png",
    "assets/img/Enemy/3 Final Enemy/Attack/2.png",
    "assets/img/Enemy/3 Final Enemy/Attack/3.png",
    "assets/img/Enemy/3 Final Enemy/Attack/4.png",
    "assets/img/Enemy/3 Final Enemy/Attack/5.png",
    "assets/img/Enemy/3 Final Enemy/Attack/6.png",
  ];
  IMAGES_DEAD = [
    "assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "assets/img/Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
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
  attackRoarSound = new Audio("assets/audio/mooaarr.mp3");
  world;
  offset = {};
  movementController;

  /**
   * Creates the endboss with movement, animation and audio setup.
   * @param {*} position_x
   * @param {*} position_y
   */
  constructor(position_x, position_y) {
    super();
    this.setStartPosition(position_x, position_y);
    this.loadEndbossImages();
    this.offset = {
      top: 90,
      bottom: 20,
      right: 20,
      left: 20,
    };
    this.setInitialAnimation();
    this.movementController = new EndbossMovementController(this);
    this.moveUpAndDown();
    this.startAnimation(() => this.currentAnimation, 200);
  }

  /**
   * Sets initial coordinates and base sprite path.
   * @param {*} position_x
   * @param {*} position_y
   */
  setStartPosition(position_x, position_y) {
    this.path = this.IMAGES_SWIM[0];
    this.position_x = position_x;
    this.position_y = position_y;
    this.startX = position_x;
    this.startY = position_y;
  }

  /**
   * Preloads all endboss image sequences.
   */
  loadEndbossImages() {
    this.loadImage();
    this.loadImages(this.IMAGES_INTRO);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Sets initial animation state for the endboss.
   */
  setInitialAnimation() {
    this.currentAnimation = this.IMAGES_SWIM;
    this.image = this.imageCache[this.IMAGES_SWIM[0]];
  }

  /**
   * Starts the continuous movement update loop.
   */
  moveUpAndDown() {
    this.interval = setInterval(() => {
      this.movementController.updateMovementState();
    }, 1000 / 60);
  }

  /**
   * Stops endboss animation and movement intervals.
   */
  stop() {
    clearInterval(this.animationInterval);
    clearInterval(this.interval);
  }
}
