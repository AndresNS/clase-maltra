"use strict";

let characters = [];

const attackButton = document.querySelector(".action-btn.attack");
const healButton = document.querySelector(".action-btn.heal");
const switchButton = document.querySelector(".action-btn.switch");
const exitButton = document.querySelector(".action-btn.exit");
const playButton = document.getElementById("play-button");

const characterSelection1 = document.querySelector(
  ".character-selection-dropdown.character-1"
);
const characterSelection2 = document.querySelector(
  ".character-selection-dropdown.character-2"
);

playButton.addEventListener("click", startGame);
exitButton.addEventListener("click", exitGame);
characterSelection1.addEventListener("change", characterSelectionChange);

setInitialGameState();

/**
 * EVENT LISTENERS
 */

function characterSelectionChange(event) {
  if (event.target.value !== 0) {
    while (characterSelection2.lastChild) {
      characterSelection2.removeChild(characterSelection2.lastChild);
    }
    const option = document.createElement("option");

    option.setAttribute("value", "0");
    option.setAttribute("disabled", true);
    option.textContent = "Seleccionar Personaje 2";

    characterSelection2.appendChild(option);

    const filteredCharacters = characters.filter(
      (character) => character.id !== event.target.value
    );

    for (const character of filteredCharacters) {
      const option = document.createElement("option");

      option.setAttribute("value", character.id);
      option.textContent = character.name;

      characterSelection2.appendChild(option);
    }
    characterSelection2.removeAttribute("disabled");
  }
}

/**
 * FUNCTIONS
 */
function setInitialGameState() {
  setControls(true);
  characterSelection2.setAttribute("disabled", true);
  loadCharacters();
}

function startGame() {
  if (characterSelection1.value === "0" || characterSelection2.value === "0")
    return alert("Debes seleccionar ambos personajes para jugar.");

  setControls(false);
  playButton.setAttribute("disabled", true);
  characterSelection1.setAttribute("disabled", true);
  characterSelection2.setAttribute("disabled", true);
}

function setControls(value) {
  const controlBtns = document.querySelectorAll(".action-btn");

  for (const btn of controlBtns) {
    if (value) btn.setAttribute("disabled", value);
    else btn.removeAttribute("disabled");
  }
}

function exitGame() {
  setControls(true);
  playButton.removeAttribute("disabled");
  characterSelection1.value = 0;
  characterSelection2.value = 0;
  characterSelection1.removeAttribute("disabled");
}

function loadCharacters() {
  try {
    fetch("./data/characters.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (const character of data) {
          const option = document.createElement("option");

          option.setAttribute("value", character.id);
          option.textContent = character.name;

          characterSelection1.appendChild(option);
          characters.push(character);
        }
      });
  } catch (error) {
    log.error(error);
  }
}
