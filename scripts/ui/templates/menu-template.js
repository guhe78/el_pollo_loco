function startMenuTemplate() {
  return `
    <div id="startgame-overlay" class="overlay">
      <div class="menu start-menu">
        <h2>Start Menu</h2>
        <button id="start-btn">Spiel starten</button>
        <div id="settings-howto-container">
          ${settingsHowtoTemplate()}
        </div>
      </div>
    </div>
  `;
}

function pauseMenuTemplate() {
  return `
    <div id="pausegame-overlay" class="overlay">
      <div class="menu pause-menu">
        <h2>Pause Menu</h2>
        <button id="resume-btn">Spiel fortsetzen</button>
        <div id="menu-actions-container">
          ${menuActionsTemplate()}
        </div>
        <div id="settings-howto-container">
          ${settingsHowtoTemplate()}
        </div>
      </div>
    </div>
  `;
}

function gameOverMenuTemplate() {
  return `
    <div id="gameover-overlay" class="overlay">
      <div class="menu gameover-menu">
        <h2>Game Over</h2>
        <div id="menu-actions-container">
          ${menuActionsTemplate()}
        </div>
      </div>
    </div>
  `;
}

function victoryMenuTemplate() {
  return `
    <div id="victory-overlay" class="overlay">
      <div class="menu victory-menu">
        <h2>Victory!</h2>
        <h3>Your score: <span id="score-value">0</span></h3>
          <div id="highscore-list-container">
          ${highscoreListTemplate()}
          </div>
          <div id="menu-actions-container">
          ${menuActionsTemplate()}
          </div>
      </div>
    </div>
  `;
}

function settingsHowtoTemplate() {
  return `
    <button id="settings-btn">Einstellungen</button>
    <button id="howto-btn">How To</button>
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
    <button id="restart-btn">Neustart</button>
    <button id="mainmenu-btn">Hauptmenü</button>
  `;
}
