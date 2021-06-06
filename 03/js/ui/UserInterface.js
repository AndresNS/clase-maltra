"use strict";

function UI() {
  this.attackButton = document.querySelector(".action-btn.attack");
  this.healButton = document.querySelector(".action-btn.heal");
  this.switchButton = document.querySelector(".action-btn.switch");
  this.exitButton = document.querySelector(".action-btn.exit");
  this.playButton = document.getElementById("play-button");
  this.characterSelection1 = document.querySelector(
    ".character-selection-dropdown.character-1"
  );
  this.characterSelection2 = document.querySelector(
    ".character-selection-dropdown.character-2"
  );
  this.characters = [];
}

/**
 * Methods
 */

UI.prototype.setControls = function (value) {
  const controlBtns = [
    this.attackButton,
    this.healButton,
    this.switchButton,
    this.exitButton,
  ];

  for (const btn of controlBtns) {
    if (value) btn.setAttribute("disabled", value);
    else btn.removeAttribute("disabled");
  }
};

UI.prototype.initialize = function () {
  this.playButton.addEventListener("click", this.startGame);
  this.exitButton.addEventListener("click", this.exitGame);
  this.characterSelection1.addEventListener(
    "change",
    this.characterSelectionChange
  );

  this.setControls(true);
  this.characterSelection2.setAttribute("disabled", true);
  this.loadCharacters();
};

UI.prototype.loadCharacters = function () {
  const that = this;
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

          that.characterSelection1.appendChild(option);
          that.characters.push(character);
        }
      });
  } catch (error) {
    log.error(error);
  }
};

UI.prototype.characterSelectionChange = function (event) {
  if (event.target.value !== 0) {
    while (this.characterSelection2.lastChild) {
      this.characterSelection2.removeChild(this.characterSelection2.lastChild);
    }
    const option = document.createElement("option");

    option.setAttribute("value", "0");
    option.setAttribute("disabled", true);
    option.textContent = "Seleccionar Personaje 2";

    this.characterSelection2.appendChild(option);

    const filteredCharacters = this.characters.filter(
      (character) => character.id !== event.target.value
    );

    for (const character of filteredCharacters) {
      const option = document.createElement("option");

      option.setAttribute("value", character.id);
      option.textContent = character.name;

      this.characterSelection2.appendChild(option);
    }
    this.characterSelection2.removeAttribute("disabled");
  }
};

UI.prototype.startGame = function () {
  if (
    this.characterSelection1.value === "0" ||
    this.characterSelection2.value === "0"
  )
    return alert("Debes seleccionar ambos personajes para jugar.");

  this.setControls(false);
  this.playButton.setAttribute("disabled", true);
  this.characterSelection1.setAttribute("disabled", true);
  this.characterSelection2.setAttribute("disabled", true);
};

UI.prototype.exitGame = function () {
  this.setControls(true);
  this.playButton.removeAttribute("disabled");
  this.characterSelection1.value = 0;
  this.characterSelection2.value = 0;
  this.characterSelection1.removeAttribute("disabled");
};

export default UI;
