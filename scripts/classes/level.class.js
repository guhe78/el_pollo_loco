class Level {
  /**
   * Creates a level from provided sections.
   * @param {*} sections
   */
  constructor(sections) {
    this.sections = sections;
    this.levelEndX = this.calculateLevelEndX();
  }

  /**
   * Calculates the maximum world end position across all sections.
   * @returns {*} Result value.
   */
  calculateLevelEndX() {
    return this.sections.reduce((maxEndX, section) => Math.max(maxEndX, section.endX), 0);
  }
}
