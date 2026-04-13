let canvas;
let ctx;
let character = new Image();

function loadCanvas() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  character.src = "../img/Sharkie/1.IDLE/1.png";

  ctx.drawImage(character, 20, 20, 50, 150);
}
