class Character extends MovableObject {
  IMAGES_IDLE = [
    "img/Sharkie/1.IDLE/1.png",
    "img/Sharkie/1.IDLE/2.png",
    "img/Sharkie/1.IDLE/3.png",
    "img/Sharkie/1.IDLE/4.png",
    "img/Sharkie/1.IDLE/5.png",
    "img/Sharkie/1.IDLE/6.png",
    "img/Sharkie/1.IDLE/7.png",
    "img/Sharkie/1.IDLE/8.png",
    "img/Sharkie/1.IDLE/9.png",
    "img/Sharkie/1.IDLE/10.png",
    "img/Sharkie/1.IDLE/11.png",
    "img/Sharkie/1.IDLE/12.png",
    "img/Sharkie/1.IDLE/13.png",
    "img/Sharkie/1.IDLE/14.png",
    "img/Sharkie/1.IDLE/15.png",
    "img/Sharkie/1.IDLE/16.png",
    "img/Sharkie/1.IDLE/17.png",
    "img/Sharkie/1.IDLE/18.png",
  ];
  IMAGES_SWIM = [
    "img/Sharkie/3.Swim/1.png",
    "img/Sharkie/3.Swim/2.png",
    "img/Sharkie/3.Swim/3.png",
    "img/Sharkie/3.Swim/4.png",
    "img/Sharkie/3.Swim/5.png",
    "img/Sharkie/3.Swim/6.png",
  ];
  IMAGES_ATTACK = [
    "img/Sharkie/4.Attack/Fin slap/1.png",
    "img/Sharkie/4.Attack/Fin slap/2.png",
    "img/Sharkie/4.Attack/Fin slap/3.png",
    "img/Sharkie/4.Attack/Fin slap/4.png",
    "img/Sharkie/4.Attack/Fin slap/5.png",
    "img/Sharkie/4.Attack/Fin slap/6.png",
    "img/Sharkie/4.Attack/Fin slap/7.png",
    "img/Sharkie/4.Attack/Fin slap/8.png",
  ];
  IMAGES_BUBBLE = [
    "img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "img/Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];
  IMAGES_HURT_ELECTRO = [
    "img/Sharkie/5.Hurt/2.Electric shock/1.png",
    "img/Sharkie/5.Hurt/2.Electric shock/2.png",
    "img/Sharkie/5.Hurt/2.Electric shock/3.png",
  ];
  IMAGES_DEAD_ELECTRO = [
    "img/Sharkie/6.dead/2.Electro_shock/1.png",
    "img/Sharkie/6.dead/2.Electro_shock/2.png",
    "img/Sharkie/6.dead/2.Electro_shock/3.png",
    "img/Sharkie/6.dead/2.Electro_shock/4.png",
    "img/Sharkie/6.dead/2.Electro_shock/5.png",
    "img/Sharkie/6.dead/2.Electro_shock/6.png",
    "img/Sharkie/6.dead/2.Electro_shock/7.png",
    "img/Sharkie/6.dead/2.Electro_shock/8.png",
    "img/Sharkie/6.dead/2.Electro_shock/9.png",
    "img/Sharkie/6.dead/2.Electro_shock/10.png",
  ];
  width;
  height;
  world;
  speed = 10;
  attackDistance = 50;
  acceleration = 2.5;
  isAttacking = false;
  isThrowing = false;
  offset = {};
  endYUp = -90;
  endYDown = 320;

  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
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
    this.startAnimation(() => this.currentAnimation, 1000 / 25);
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
    setInterval(() => {
      let isMoving = false;
      if (this.world.keyboard.RIGHT && this.position_x < 2600) {
        this.otherDirection = false;
        this.position_x += this.speed;
        this.world.camera_x = -this.position_x;
        isMoving = true;
      }
      if (this.world.keyboard.LEFT && this.position_x > 0) {
        this.otherDirection = true;
        this.position_x -= this.speed;
        this.world.camera_x = -this.position_x;
        isMoving = true;
      }
      if (this.world.keyboard.UP && this.position_y > this.endYUp) {
        this.position_y -= this.speed;
        isMoving = true;
      }
      if (this.world.keyboard.DOWN && this.position_y < this.endYDown) {
        this.position_y += this.speed;
        isMoving = true;
      }
      if (this.world.keyboard.SPACE) {
        this.applyAttack();
      }
      if (this.world.keyboard.THROW) {
        this.isThrowing = true;
        setTimeout(() => {
          this.isThrowing = false;
        }, 300);
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

  setAnimation(images) {
    if (this.currentAnimation !== images) {
      this.currentAnimation = images;
      this.currentImage = 0;
    }
  }

  applyAttack() {
    if (this.isAttacking) return;
    this.isAttacking = true;
    const startPosition = this.position_x;
    this.position_x += this.attackDistance;
    setTimeout(() => {
      this.position_x = startPosition;
      this.isAttacking = false;
    }, 1000);
  }
}
