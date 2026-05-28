# Sharkie the Shark

[![Vanilla JavaScript](https://img.shields.io/badge/Vanilla%20JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/)
[![Canvas Game](https://img.shields.io/badge/Canvas-Game-1C7C8C)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Developer Akademie](https://img.shields.io/badge/Developer%20Akademie-Projekt-2D7DD2)](https://www.developerakademie.com/)

Ein browserbasiertes 2D-Canvas-Game, entwickelt im Rahmen meiner Ausbildung bei der Developer Akademie.
Das Spiel läuft ohne Build-Tooling direkt im Browser und wurde mit HTML, CSS und JavaScript umgesetzt.

English version: [README.en.md](README.en.md)

## Über das Projekt

In Sharkie steuerst du einen kleinen Hai durch mehrere Abschnitte einer Unterwasserwelt. Du sammelst Münzen und Giftflaschen, weichst Gegnern aus und kämpfst dich bis zum Endboss vor. Das Projekt kombiniert klassische Plattform- und Action-Elemente mit einer eigenen Menü-, Overlay- und Steuerungslogik.

## Spielablauf

- Sammle Münzen und Giftflaschen, um Punkte zu machen und stärker zu werden.
- Weiche Gegnern aus oder betäube sie mit Blasen.
- Nutze den Nahkampfangriff nur dann, wenn ein Gegner bereits betäubt ist.
- Arbeite dich bis zum Endboss vor und besiege ihn mit derselben Kampfmechanik.

## Features

- Zwei Spielabschnitte mit unterschiedlichen Gegnertypen und Sammelobjekten
- Endboss-Kampf am Ende des Levels
- Lebens-, Münz- und Giftanzeige im HUD
- Pause-Menü, Game-Over-Ansicht und Sieg-Bildschirm
- Einstellungsmenü für Sound und Anzeige-Modus
- Mobile Steuerung mit Touch-Buttons
- Lokale Speicherung von Sound- und Display-Einstellungen im Browser

## Steuerung

- Pfeiltasten: Schwimmen und Bewegen
- D: Blasen schießen
- Leertaste: Nahkampfangriff
- Esc: Spiel pausieren

Auf Mobilgeräten stehen virtuelle Steuerungsbuttons für Bewegung, Angriff und Pause zur Verfügung.

## Projektstruktur

- index.html - Einstiegspunkt und Einbindung aller Skripte und Styles
- script.js - Startlogik, Menüsteuerung und Mobile-Controls
- scripts/game.js - Initialisierung von Canvas, World und UI-Verhalten
- scripts/classes/ - Spiellogik, Charaktere, Gegner, Controller und UI-Helfer
- scripts/level/level1.js - Levelaufbau mit Abschnitten, Gegnern und Sammelobjekten
- styles/ - Layout-, Komponenten- und Responsive-Styles
- assets/ - Grafiken, Sounds und weitere Medien

## Technik

- Vanilla JavaScript ohne Framework
- Canvas-Rendering für das Spielgeschehen
- Klassenbasierte Architektur mit ausgelagerter Controller-Logik
- Overlay-System für Menüs und Statusanzeigen
- Responsive Darstellung für Desktop und mobile Geräte

## Lokales Starten

Das Projekt benötigt keine Installation von Abhängigkeiten.

1. Repository herunterladen oder klonen.
2. `index.html` direkt im Browser öffnen oder das Projekt über einen lokalen Webserver starten.

Wenn du einen lokalen Server nutzen möchtest, eignet sich zum Beispiel die VS-Code-Erweiterung Live Server oder ein beliebiger einfacher Static Server.

## Hintergrund

Dieses Projekt entstand im Rahmen meiner Ausbildung bei der Developer Akademie und dient dazu, die Arbeit mit JavaScript, Objektorientierung, Canvas-Animationen und einer modularen Spielarchitektur praktisch umzusetzen.
