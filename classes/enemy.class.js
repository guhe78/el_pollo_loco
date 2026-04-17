class Enemy extends MovableObject {
  constructor(path, position_x, position_y) {
    super(path, position_x, position_y);
    this.width = 150;
    this.height = 100;
    this.loadImage();
    this.moveObject(1);
  }

  eat() {
    console.log("Mjamm mjamm");
  }
}
