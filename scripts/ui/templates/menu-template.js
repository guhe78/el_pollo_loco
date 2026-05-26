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

function howToMenuTemplate() {
  return `
    <div id="howto-overlay" class="overlay">
      <div class="menu howto-menu">
        <h2>How To Play</h2>
        <h3>Steuerung</h3>
        <ul>
          <li>Pfeiltasten: Schwimmen und bewegen</li>
          <li>D: Blase schießen</li>
          <li>Leertaste: Nahkampfangriff</li>
        </ul>
        <h3>Kampf-System</h3>
        <ul>
          <li>Mit Blasen betäubst du Gegner.</li>
          <li>Nur betäubte Gegner kannst du mit Leertaste besiegen.</li>
          <li>Triffst du unbetäubte Gegner, verlierst du Leben.</li>
        </ul>
        <h3>Ziele im Level</h3>
        <ul>
          <li>Abschnitt 1: Münzen sammeln</li>
          <li>Abschnitt 2: Giftflaschen sammeln</li>
          <li>Gegner und Items geben Punkte.</li>
        </ul>
        <h3>Endboss</h3>
        <ul>
          <li>Genauso wie normale Gegner: erst mit Blasen betäuben.</li>
          <li>Dann mit Leertaste angreifen.</li>
          <li>Wiederholen, bis der Endboss besiegt ist.</li>
        </ul>
        <p><strong>Tipp:</strong> Sichere Reihenfolge: D, dann Leertaste.</p>
        <button id="back-btn" class="button">Zurück</button>
      </div>
    </div>
  `;
}

function menuActionsTemplate() {
  return `
    <button id="restart-btn" class="button">Neustart</button>
    <button id="mainmenu-btn" class="button">Hauptmenü</button>
  `;
}
