class Enemy extends MovableObject {
  constructor(path, position_x, position_y, width, height) {
    super(path, position_x, position_y, width, height);
    this.loadImage();
  }

  eat() {
    console.log("Mjamm mjamm");
  }
}
