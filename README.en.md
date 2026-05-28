# Sharkie the Shark

[![Vanilla JavaScript](https://img.shields.io/badge/Vanilla%20JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/)
[![Canvas Game](https://img.shields.io/badge/Canvas-Game-1C7C8C)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Developer Akademie](https://img.shields.io/badge/Developer%20Akademie-Training%20Project-2D7DD2)](https://www.developerakademie.com/)

A browser-based 2D canvas game created as part of my training at Developer Akademie.
The game runs directly in the browser without a build step and is implemented with HTML, CSS, and JavaScript.

German version: [README.md](README.md)

## About the Project

In Sharkie, you control a small shark through several sections of an underwater world. You collect coins and poison bottles, avoid enemies, and fight your way to the end boss. The project combines classic platform and action elements with custom menu, overlay, and control logic.

## Gameplay

- Collect coins and poison bottles to earn points and power up.
- Avoid enemies or stun them with bubbles.
- Use the melee attack only after an enemy has been stunned.
- Reach the end boss and defeat it with the same combat mechanics.

## Features

- Two level sections with different enemy types and collectibles
- End boss fight at the end of the level
- HUD for life, coins, and poison
- Pause menu, game over screen, and victory screen
- Settings menu for sound and display mode
- Mobile controls with touch buttons
- Local browser storage for sound and display preferences

## Controls

- Arrow keys: move and swim
- D: shoot a bubble
- Space: melee attack
- Esc: pause the game

On mobile devices, virtual buttons are available for movement, attack, and pause.

## Project Structure

- index.html - entry point and script/style loading
- script.js - start logic, menu handling, and mobile controls
- scripts/game.js - canvas, world, and UI initialization
- scripts/classes/ - game logic, characters, enemies, controllers, and UI helpers
- scripts/level/level1.js - level setup with sections, enemies, and collectibles
- styles/ - layout, component, and responsive styles
- assets/ - graphics, sounds, and other media

## Tech Stack

- Vanilla JavaScript without a framework
- Canvas rendering for gameplay
- Class-based architecture with separated controller logic
- Overlay system for menus and status indicators
- Responsive design for desktop and mobile devices

## Run Locally

No dependencies need to be installed.

1. Download or clone the repository.
2. Open `index.html` directly in the browser or run the project through a local web server.

If you want to use a local server, the VS Code Live Server extension or any simple static server works well.

## Background

This project was created during my training at Developer Akademie and is used to practice JavaScript, object-oriented programming, canvas animations, and a modular game architecture.
