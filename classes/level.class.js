class Level {
  constructor(sections) {
    this.sections = sections;
    this.levelEndX = this.calculateLevelEndX();
  }

  calculateLevelEndX() {
    return this.sections.reduce(
      (maxEndX, section) => Math.max(maxEndX, section.endX),
      0,
    );
  }
}
