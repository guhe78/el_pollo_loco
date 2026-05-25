function startMenuTemplate() {
  return `
    <div id="startgame-overlay" class="overlay">
      <div class="menu start-menu">
        <h2>Start Menu</h2>
        <button id="start-btn" class="button">Spiel starten</button>
          ${settingsHowtoTemplate()}
      </div>
    </div>
  `;
}

function pauseMenuTemplate() {
  return `
    <div id="pausegame-overlay" class="overlay">
      <div class="menu ingame-menu">
        <h3>Pause Menu</h3>
        <button id="resume-btn" class="button">Spiel fortsetzen</button>
          ${menuActionsTemplate()}
          <div class="small-buttons-container">
            ${settingsHowtoTemplate()}
          </div>
      </div>
    </div>
  `;
}

function gameOverMenuTemplate() {
  return `
    <div id="gameover-overlay" class="overlay">
      <div class="menu ingame-menu">
        <h2>Game Over</h2>
        ${menuActionsTemplate()}  
    </div>
  `;
}

function victoryMenuTemplate() {
  return `
    <div id="victory-overlay" class="overlay">
      <div class="menu ingame-menu">
        <h2>Victory!</h2>
        <h3>Your score: <span id="score-value">${world.character.highscore}</span></h3>
          ${highscoreListTemplate()}
          ${menuActionsTemplate()}
      </div>
    </div>
  `;
}

function settingsHowtoTemplate() {
  const mode = localStorage.getItem("displayMode") || "standard";
  const label =
    mode === "fullscreen"
      ? "Einstellungen (Modus: Vollbild 2x)"
      : "Einstellungen (Modus: Standard 720x480)";
  return `
    <button id="settings-btn" class="button">${label}</button>
    <button id="howto-btn" class="button">How To</button>
  `;
}

function highscoreListTemplate() {
  return `
    <h3>Highscores</h3>
    <ol id="highscore-list">
      <!-- Highscore items will be dynamically inserted here -->
    </ol>
  `;
}

function menuActionsTemplate() {
  return `
    <button id="restart-btn" class="button">Neustart</button>
    <button id="mainmenu-btn" class="button">Hauptmenü</button>
  `;
}
