/**
 * Returns HTML template for the start menu overlay.
 * @returns {*} Result value.
 */
function startMenuTemplate() {
  return `
    <div id="startgame-overlay" class="overlay">
      <div class="menu start-menu">
        <h1 class="main-headline text-kontur">
      <span>Sharkie</span><span> the </span><span>shark</span>
    </h1>
        <button id="start-btn" class="button">Spiel starten</button>
            ${settingsHowtoTemplate()}
      </div>
    </div>
  `;
}

/**
 * Returns HTML template for the pause menu overlay.
 * @returns {*} Result value.
 */
function pauseMenuTemplate() {
  return `
    <div id="pausegame-overlay" class="overlay">
      <div class="menu ingame-menu">
        <h1 class="main-headline text-kontur">
          <span>Sharkie</span><span> the </span><span>shark</span>
        </h1>
        <h2 class="text-kontur">Pause Menu</h2>
        <button id="resume-btn" class="button">Spiel fortsetzen</button>
          ${menuActionsTemplate()}
          ${settingsHowtoTemplate()}
      </div>
    </div>
  `;
}

/**
 * Returns HTML template for the game-over overlay.
 * @returns {*} Result value.
 */
function gameOverMenuTemplate() {
  return `
    <div id="gameover-overlay" class="overlay">
      <div class="menu ingame-menu">
        <h1 class="main-headline text-kontur">
          <span>Sharkie</span><span> the </span><span>shark</span>
        </h1>
        <h2 class="text-kontur">Game Over</h2>
        ${menuActionsTemplate()}  
    </div>
  `;
}

/**
 * Returns HTML template for the victory overlay.
 * @returns {*} Result value.
 */
function victoryMenuTemplate() {
  return `
    <div id="victory-overlay" class="overlay">
      <div class="menu ingame-menu">
        <h1 class="main-headline text-kontur">
          <span>Sharkie</span><span> the </span><span>shark</span>
        </h1>
        <h2 class="text-kontur">Victory!</h2>
        <h2 class="text-kontur">Your score: <span id="score-value">${world.character.highscore}</span></h2>
          ${menuActionsTemplate()}
      </div>
    </div>
  `;
}

/**
 * Returns HTML template for the short victory transition image.
 * @returns {*} Result value.
 */
function victoryTransitionTemplate() {
  return `
    <div id="victory-transition-overlay" class="overlay victory-transition-overlay">
      <img
        src="assets/img/Botones/Tittles/You win/Mesa de trabajo 1.png"
        alt="Victory"
        class="victory-transition-image"
      />
    </div>
  `;
}

/**
 * Returns HTML snippet for settings and help shortcut buttons.
 * @returns {*} Result value.
 */
function settingsHowtoTemplate() {
  return `
  <div class="small-buttons-container">
    <div class="settings-howto">
      <button id="settings-btn" class="button settings-btn">⚙️</button>
      <button id="howto-btn" class="button howto-btn">❓</button>
    </div>
      <button id="impressum-btn" class="button impressum-btn">impressum</button>
  </div>
  `;
}

/**
 * Returns HTML template for the settings overlay.
 * @returns {*} Result value.
 */
function settingsMenuTemplate() {
  const mode = localStorage.getItem("displayMode") || "standard";
  const soundEnabled = localStorage.getItem("soundEnabled") !== "false";
  const isMobile = window.matchMedia("(pointer: coarse)").matches;

  const displayLabel =
    mode === "fullscreen" ? "Bildgröße: Vollbild" : "Bildgröße: Standard";
  const displayButtons = isMobile
    ? "<p>Auf Mobilgeräten ist Vollbild immer aktiv.</p>"
    : `<button id="display-toggle-btn" class="button">${displayLabel}</button>`;
  const soundLabel = soundEnabled ? "Sound: AN" : "Sound: AUS";

  return `<div id="settings-overlay" class="overlay">    
          <div class="menu ingame-menu">      
            <h2 class="text-kontur">Einstellungen</h2>      
              ${displayButtons}      
              <button id="sound-toggle-btn" class="button">${soundLabel}</button>      
              <button id="back-settings-btn" class="button">Zurück</button>    
          </div>  
        </div> `;
}

/**
 * Returns HTML template for the how-to-play overlay.
 * @returns {*} Result value.
 */
function howToMenuTemplate() {
  return `
    <div id="howto-overlay" class="overlay">
      <div class="menu howto-menu text-kontur">
        <h2>How To Play</h2>
        <h3>Steuerung</h3>
        <ul>
          <li>Pfeiltasten: Schwimmen und bewegen</li>
          <li>D-Taste: Blase schießen</li>
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
          <li>Abschnitt 1: Gold, Gold, Gold! Münzen sammeln. Pro Flasche gibt es Punkte.</li>
          <li>Abschnitt 2: Halte die Umwelt sauber! Giftflaschen sammeln. Pro Flasche gibt es Punkte.</li>
          <li>Gegner und Items geben Punkte. Die Items haben keine weitere Funktion, nur Punkte</li>
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

/**
 * Returns HTML snippet for common in-game menu action buttons.
 * @returns {*} Result value.
 */
function menuActionsTemplate() {
  return `
    <button id="restart-btn" class="button">Neustart</button>
    <button id="mainmenu-btn" class="button">Spiel beenden</button>
  `;
}

/**
 * Returns HTML template for the impressum overlay.
 * @returns {*} Result value.
 */
function impressumMenuTemplate() {
  return `
    <div id="impressum-overlay" class="overlay">
      <div class="menu howto-menu text-kontur">
        <h2>Impressum</h2>
        <p>Günter Heldt<br>
        c/o COCENTER<br>
        Koppoldstr. 1<br>
        86551 Aichach</p>
        <p>Kontakt:<br>
        E-Mail: g.heldt@web.de</p>
        <button id="back-impressum-btn" class="button">Zurück</button>
      </div>
    </div>
  `;
}
