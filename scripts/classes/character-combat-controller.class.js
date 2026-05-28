class CharacterCombatController {
  /**
   * Creates a combat controller for Character.
   * @param {*} character
   */
  constructor(character) {
    this.character = character;
  }

  /**
   * Starts the slap attack sequence.
   */
  applySlapAttack() {
    const c = this.character;
    if (c.isAttacking) return;

    const attack = this.createSlapAttack();
    this.startSlapAttack(attack);
    this.finishSlapAttack(attack);
  }

  /**
   * Builds timing and movement data for a slap attack.
   * @returns {*} Result value.
   */
  createSlapAttack() {
    const c = this.character;
    const direction = c.otherDirection ? -1 : 1;
    return {
      startedAt: Date.now(),
      delta: c.attackDistance * direction,
      animationDuration: c.calculateAnimationDuration(c.IMAGES_ATTACK),
    };
  }

  /**
   * Applies immediate slap effects and plays slap sound.
   * @param {*} attack
   */
  startSlapAttack(attack) {
    const c = this.character;
    c.isAttacking = true;
    c.lastSlapStartedAt = attack.startedAt;
    c.slapImpactReadyAt = c.lastSlapStartedAt + c.slapImpactDelayMs;
    c.position_x += attack.delta;
    c.lastSlapSoundEndsAt = c.lastSlapStartedAt + this.getSlapSoundDurationMs();
    c.slapSound.currentTime = 0;
    c.slapSound.play();
  }

  /**
   * Ends slap attack after animation duration.
   * @param {*} attack
   */
  finishSlapAttack(attack) {
    const c = this.character;
    setTimeout(() => {
      c.position_x -= attack.delta;
      c.isAttacking = false;
    }, attack.animationDuration);
  }

  /**
   * Starts bubble throw animation and spawns bubble at the end.
   */
  applyBubbleAttack() {
    const c = this.character;
    c.isThrowing = true;
    const throwAnimationDuration = this.getBubbleThrowDuration();
    c.blubSound.play();

    setTimeout(() => {
      c.world.spawnBubble(c.otherDirection);
      c.isThrowing = false;
    }, throwAnimationDuration);
  }

  /**
   * Returns duration of bubble throw animation.
   * @returns {*} Result value.
   */
  getBubbleThrowDuration() {
    const c = this.character;
    return c.calculateAnimationDuration(c.IMAGES_BUBBLE);
  }

  /**
   * Returns slap sound duration with fallback value.
   * @returns {*} Result value.
   */
  getSlapSoundDurationMs() {
    const c = this.character;
    const durationSeconds = c.slapSound?.duration;
    if (Number.isFinite(durationSeconds) && durationSeconds > 0) {
      return Math.round(durationSeconds * 1000);
    }

    return c.slapSoundFallbackDurationMs;
  }

  /**
   * Computes remaining delay until slap sound is finished.
   * @returns {*} Result value.
   */
  getDelayUntilSlapSoundFinished() {
    const c = this.character;
    return Math.max(0, (c.lastSlapSoundEndsAt || 0) - Date.now());
  }
}
