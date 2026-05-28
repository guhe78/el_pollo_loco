class Character extends MovableObject {
  IMAGES_IDLE = [
    "../../assets/img/Sharkie/1.IDLE/1.png",
    "../../assets/img/Sharkie/1.IDLE/2.png",
    "../../assets/img/Sharkie/1.IDLE/3.png",
    "../../assets/img/Sharkie/1.IDLE/4.png",
    "../../assets/img/Sharkie/1.IDLE/5.png",
    "../../assets/img/Sharkie/1.IDLE/6.png",
    "../../assets/img/Sharkie/1.IDLE/7.png",
    "../../assets/img/Sharkie/1.IDLE/8.png",
    "../../assets/img/Sharkie/1.IDLE/9.png",
    "../../assets/img/Sharkie/1.IDLE/10.png",
    "../../assets/img/Sharkie/1.IDLE/11.png",
    "../../assets/img/Sharkie/1.IDLE/12.png",
    "../../assets/img/Sharkie/1.IDLE/13.png",
    "../../assets/img/Sharkie/1.IDLE/14.png",
    "../../assets/img/Sharkie/1.IDLE/15.png",
    "../../assets/img/Sharkie/1.IDLE/16.png",
    "../../assets/img/Sharkie/1.IDLE/17.png",
    "../../assets/img/Sharkie/1.IDLE/18.png",
  ];
  IMAGES_SWIM = [
    "../../assets/img/Sharkie/3.Swim/1.png",
    "../../assets/img/Sharkie/3.Swim/2.png",
    "../../assets/img/Sharkie/3.Swim/3.png",
    "../../assets/img/Sharkie/3.Swim/4.png",
    "../../assets/img/Sharkie/3.Swim/5.png",
    "../../assets/img/Sharkie/3.Swim/6.png",
  ];
  IMAGES_ATTACK = [
    "../../assets/img/Sharkie/4.Attack/Fin slap/1.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/2.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/3.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/4.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/5.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/6.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/7.png",
    "../../assets/img/Sharkie/4.Attack/Fin slap/8.png",
  ];
  IMAGES_BUBBLE = [
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "../../assets/img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];
  IMAGES_HURT_ELECTRO = [
    "../../assets/img/Sharkie/5.Hurt/2.Electric shock/1.png",
    "../../assets/img/Sharkie/5.Hurt/2.Electric shock/2.png",
    "../../assets/img/Sharkie/5.Hurt/2.Electric shock/3.png",
  ];
  IMAGES_DEAD_ELECTRO = [
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/1.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/2.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/3.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/4.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/5.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/6.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/7.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/8.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/9.png",
    "../../assets/img/Sharkie/6.dead/2.Electro_shock/10.png",
  ];
  path = "../../assets/img/Sharkie/1.IDLE/1.png";
  position_x = 50;
  position_y = 150;
  width;
  height;
  world;
  speed = 10;
  attackDistance = 100;
  acceleration = 2.5;
  isAttacking = false;
  isThrowing = false;
  offset = {};
  endYUp = -90;
  endYDown = 320;
  animationSpeed = 100;
  cameraOffsetX = 100;
  cameraOffsetY = 100;
  blubSound = new Audio("../../assets/audio/blubb.mp3");
  slapSound = new Audio("../../assets/audio/slap.mp3");
  auaSound = new Audio("../../assets/audio/aua.mp3");
  blingSound = new Audio("../../assets/audio/bling.mp3");
  hitSound = new Audio("../../assets/audio/hit.mp3");
  highscore = 0;

  constructor() {
    super();
    this.width = 250;
    this.height = 200;
    this.offset = {
      top: 100,
      bottom: 40,
      right: 50,
      left: 50,
    };

    this.loadImage();
    this.loadCharacterImages();

    this.currentAnimation = this.IMAGES_IDLE;
    this.image = this.imageCache[this.IMAGES_IDLE[0]];

    this.movementControl();
    this.startAnimation(() => this.currentAnimation, 100);
  }

  loadCharacterImages() {
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_BUBBLE);
    this.loadImages(this.IMAGES_HURT_ELECTRO);
    this.loadImages(this.IMAGES_DEAD_ELECTRO);
  }

  movementControl() {
    this.movementInterval = setInterval(() => {
      if (!this.world || this.world.gameState !== "running") return;
      let isMoving = false;
      const isInEndbossSection = Boolean(this.world.currentSection?.endboss);
      const isEndbossFightActive = this.isEndbossFightActive();
      const minY = isInEndbossSection ? -140 : this.endYUp;
      const maxY = isInEndbossSection
        ? this.world.canvas.height - this.height + 80
        : this.endYDown;
      const { minX, maxX } = this.getHorizontalBounds();

      if (this.world.isEndbossIntroActive) {
        this.changeAnimation(false);
        return;
      }
      if (
        this.world.keyboard.RIGHT &&
        this.position_x < maxX &&
        !this.isAttacking &&
        !this.isDead()
      ) {
        this.moveRight();
        isMoving = true;
      }
      if (
        this.world.keyboard.LEFT &&
        this.position_x > minX &&
        !this.isAttacking &&
        !this.isDead()
      ) {
        this.moveLeft();
        isMoving = true;
      }
      if (
        this.world.keyboard.UP &&
        this.position_y > minY &&
        !this.isAttacking &&
        !this.isDead()
      ) {
        this.position_y -= this.speed;
        isMoving = true;
      }
      if (
        this.world.keyboard.DOWN &&
        this.position_y < maxY &&
        !this.isAttacking &&
        !this.isDead()
      ) {
        this.position_y += this.speed;
        isMoving = true;
      }
      if (this.world.keyboard.SPACE && !this.isAttacking && !this.isDead()) {
        this.applySlapAttack();
        this.world.keyboard.SPACE = false;
      }
      if (
        this.world.keyboard.THROW &&
        !this.isThrowing &&
        !this.isAttacking &&
        !this.isDead()
      ) {
        this.applyBubbleAttack();
      }

      if (isEndbossFightActive) {
        this.clampCameraToCurrentSection();
      }

      this.changeAnimation(isMoving);
    }, 1000 / 60);
  }

  changeAnimation(isMoving) {
    if (this.isDead()) {
      this.setAnimation(this.IMAGES_DEAD_ELECTRO);
    } else if (this.isHurt()) {
      this.setAnimation(this.IMAGES_HURT_ELECTRO);
    } else if (this.isAttacking) {
      this.setAnimation(this.IMAGES_ATTACK);
    } else if (this.isThrowing) {
      this.setAnimation(this.IMAGES_BUBBLE);
    } else if (isMoving) {
      this.setAnimation(this.IMAGES_SWIM);
    } else {
      this.setAnimation(this.IMAGES_IDLE);
    }
  }

  moveRight() {
    this.otherDirection = false;
    const { maxX } = this.getHorizontalBounds();
    this.position_x = Math.min(this.position_x + this.speed, maxX);
    this.updateCameraPosition();
  }

  moveLeft() {
    this.otherDirection = true;
    const { minX } = this.getHorizontalBounds();
    this.position_x = Math.max(this.position_x - this.speed, minX);
    this.updateCameraPosition();
  }

  isEndbossFightActive() {
    return Boolean(
      this.world?.currentSection?.endboss && this.world.endbossIntroDone,
    );
  }

  getHorizontalBounds() {
    const defaultMaxX =
      this.world.level.levelEndX + this.cameraOffsetX - this.world.canvas.width;

    if (!this.isEndbossFightActive()) {
      return { minX: 0, maxX: defaultMaxX };
    }

    const section = this.world.currentSection;
    const minX = section.startX;
    const maxX = Math.max(minX, section.endX - this.width);

    return { minX, maxX };
  }

  updateCameraPosition() {
    const targetCamera = Math.round(
      Math.min(0, -this.position_x + this.cameraOffsetX),
    );
    this.world.camera_x = targetCamera;

    if (this.isEndbossFightActive()) {
      this.clampCameraToCurrentSection();
    }
  }

  clampCameraToCurrentSection() {
    const section = this.world.currentSection;
    if (!section) return;

    const minCameraX = Math.round(
      Math.min(0, -section.endX + this.world.canvas.width),
    );
    const maxCameraX = Math.round(Math.min(0, -section.startX));

    this.world.camera_x = Math.max(
      minCameraX,
      Math.min(maxCameraX, this.world.camera_x),
    );
  }

  applySlapAttack() {
    if (this.isAttacking) return;
    this.isAttacking = true;
    const direction = this.otherDirection ? -1 : 1;
    const delta = this.attackDistance * direction;
    const animationDuration = this.calculateAnimationDuration(
      this.IMAGES_ATTACK,
    );
    this.position_x += delta;
    this.slapSound.play();

    setTimeout(() => {
      this.position_x -= delta;
      this.isAttacking = false;
    }, animationDuration);
  }

  applyBubbleAttack() {
    this.isThrowing = true;
    const throwAnimationDuration = this.calculateAnimationDuration(
      this.IMAGES_BUBBLE,
    );
    this.blubSound.play();
    setTimeout(() => {
      this.world.spawnBubble(this.otherDirection);
      this.isThrowing = false;
    }, throwAnimationDuration);
  }

  stop() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }

  calculateAnimationDuration(imageArray) {
    return imageArray.length * this.animationSpeed;
  }
}
