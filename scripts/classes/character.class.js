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
  edgeReachBottom = 45;
  edgeReachTop = 100;
  blubSound = new Audio("../../assets/audio/blubb.mp3");
  slapSound = new Audio("../../assets/audio/slap.mp3");
  auaSound = new Audio("../../assets/audio/aua.mp3");
  blingSound = new Audio("../../assets/audio/bling.mp3");
  hitSound = new Audio("../../assets/audio/hit.mp3");
  swimSound = new Audio("../../assets/audio/swim.mp3");
  lastSlapStartedAt = 0;
  slapImpactDelayMs = 220;
  slapImpactReadyAt = 0;
  lastSlapSoundEndsAt = 0;
  slapSoundFallbackDurationMs = 450;
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
    this.swimSound.loop = true;
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
      this.updateMovementFrame();
    }, 1000 / 60);
  }

  updateMovementFrame() {
    if (!this.isMovementActive()) return;
    if (this.world.isEndbossIntroActive) return this.showIdleDuringIntro();

    const bounds = this.getMovementBounds();
    const isMoving = this.handleMovement(bounds);

    this.handleCombatActions();
    this.updateSectionCamera();
    this.changeAnimation(isMoving);
  }

  isMovementActive() {
    return this.world && this.world.gameState === "running";
  }

  showIdleDuringIntro() {
    this.changeAnimation(false);
  }

  getMovementBounds() {
    return {
      minY: -this.edgeReachTop,
      maxY: this.world.canvas.height - this.height + this.edgeReachBottom,
      ...this.getHorizontalBounds(),
    };
  }

  handleMovement(bounds) {
    const movedX = this.handleHorizontalMovement(bounds);
    const movedY = this.handleVerticalMovement(bounds);
    return movedX || movedY;
  }

  handleHorizontalMovement({ minX, maxX }) {
    if (!this.canMove()) return false;
    if (this.world.keyboard.RIGHT && this.position_x < maxX) {
      this.moveRight();
      return true;
    }
    if (this.world.keyboard.LEFT && this.position_x > minX) {
      this.moveLeft();
      return true;
    }
    return false;
  }

  handleVerticalMovement({ minY, maxY }) {
    if (!this.canMove()) return false;
    if (this.world.keyboard.UP && this.position_y > minY) {
      this.position_y -= this.speed;
      return true;
    }
    if (this.world.keyboard.DOWN && this.position_y < maxY) {
      this.position_y += this.speed;
      return true;
    }
    return false;
  }

  handleCombatActions() {
    if (this.world.keyboard.SPACE && this.canMove()) {
      this.applySlapAttack();
      this.world.keyboard.SPACE = false;
    }

    if (this.world.keyboard.THROW && !this.isThrowing && this.canMove()) {
      this.applyBubbleAttack();
    }
  }

  updateSectionCamera() {
    if (this.isEndbossFightActive()) {
      this.clampCameraToCurrentSection();
    }
  }

  canMove() {
    return !this.isAttacking && !this.isDead();
  }

  changeAnimation(isMoving) {
    this.setCurrentAnimation(isMoving);
    this.updateSwimSound(isMoving);
  }

  setCurrentAnimation(isMoving) {
    if (this.isDead()) return this.setAnimation(this.IMAGES_DEAD_ELECTRO);
    if (this.isHurt()) return this.setAnimation(this.IMAGES_HURT_ELECTRO);
    if (this.isAttacking) return this.setAnimation(this.IMAGES_ATTACK);
    if (this.isThrowing) return this.setAnimation(this.IMAGES_BUBBLE);
    if (isMoving) return this.setAnimation(this.IMAGES_SWIM);

    this.setAnimation(this.IMAGES_IDLE);
  }

  updateSwimSound(isMoving) {
    if (isMoving && !this.isHurt() && !this.isDead()) {
      this.playSwimSound();
      return;
    }

    this.stopSwimSound();
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

    const attack = this.createSlapAttack();
    this.startSlapAttack(attack);
    this.finishSlapAttack(attack);
  }

  createSlapAttack() {
    const direction = this.otherDirection ? -1 : 1;
    return {
      startedAt: Date.now(),
      delta: this.attackDistance * direction,
      animationDuration: this.calculateAnimationDuration(this.IMAGES_ATTACK),
    };
  }

  startSlapAttack(attack) {
    this.isAttacking = true;
    this.lastSlapStartedAt = attack.startedAt;
    this.slapImpactReadyAt = this.lastSlapStartedAt + this.slapImpactDelayMs;
    this.position_x += attack.delta;
    this.lastSlapSoundEndsAt =
      this.lastSlapStartedAt + this.getSlapSoundDurationMs();
    this.slapSound.currentTime = 0;
    this.slapSound.play();
  }

  finishSlapAttack(attack) {
    setTimeout(() => {
      this.position_x -= attack.delta;
      this.isAttacking = false;
    }, attack.animationDuration);
  }

  applyBubbleAttack() {
    this.isThrowing = true;
    const throwAnimationDuration = this.getBubbleThrowDuration();
    this.blubSound.play();

    setTimeout(() => {
      this.world.spawnBubble(this.otherDirection);
      this.isThrowing = false;
    }, throwAnimationDuration);
  }

  getBubbleThrowDuration() {
    return this.calculateAnimationDuration(this.IMAGES_BUBBLE);
  }

  stop() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }

  calculateAnimationDuration(imageArray) {
    return imageArray.length * this.animationSpeed;
  }

  getSlapSoundDurationMs() {
    const durationSeconds = this.slapSound?.duration;
    if (Number.isFinite(durationSeconds) && durationSeconds > 0) {
      return Math.round(durationSeconds * 1000);
    }

    return this.slapSoundFallbackDurationMs;
  }

  getDelayUntilSlapSoundFinished() {
    return Math.max(0, (this.lastSlapSoundEndsAt || 0) - Date.now());
  }

  playSwimSound() {
    if (!this.world.soundEnabled) return;

    this.swimSound.muted = false;

    if (this.swimSound.paused) {
      this.swimSound.play();
    }
  }

  stopSwimSound() {
    this.swimSound.pause();
    this.swimSound.currentTime = 0;
  }
}
