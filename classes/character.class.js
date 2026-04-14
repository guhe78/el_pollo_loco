class Character extends MovableObject {
  constructor(position_x, position_y, imagePath) {
    super(position_x, position_y, imagePath);
    super().loadImage(image);
  }

  jump() {
    console.log("Jump jump");
  }
}
