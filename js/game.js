let canvas;
let ctx;
let world = new World();

function loadCanvas() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  //ctx.drawImage(character, 20, 20, 50, 150);

  console.log("My character is ", world.character);
}
