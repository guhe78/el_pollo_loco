class OverlayManager {
  /**
   * Creates overlay manager and resolves overlay container element.
   */
  constructor() {
    this.container = document.getElementById("game-overlay");
  }

  /**
   * Renders a template into the overlay and makes it visible.
   * @param {*} template
   */
  show(template) {
    this.hide();

    this.container.innerHTML = template;

    this.container.classList.remove("hidden");
  }

  /**
   * Clears overlay content and hides the container.
   */
  hide() {
    this.container.innerHTML = "";
    this.container.classList.add("hidden");
  }
}
