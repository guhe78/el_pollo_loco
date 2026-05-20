class OverlayManager {
  constructor() {
    this.container = document.getElementById("game-overlay");
  }

  show(template) {
    this.hide();

    this.container.innerHTML = template;

    this.container.classList.remove("hidden");
  }

  hide() {
    this.container.innerHTML = "";
    this.container.classList.add("hidden");
  }
}
