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

UI.prototype = {
  initialize: function () {
    this.playButton.addEventListener("click", () => {
      if (
        this.characterSelection1.value === "0" ||
        this.characterSelection2.value === "0"
      )
        return alert("Debes seleccionar ambos personajes para jugar.");

      this.setControls(false);
      this.playButton.setAttribute("disabled", true);
      this.characterSelection1.setAttribute("disabled", true);
      this.characterSelection2.setAttribute("disabled", true);
    });

    this.exitButton.addEventListener("click", () => {
      this.setControls(true);
      this.playButton.removeAttribute("disabled");
      this.characterSelection1.value = 0;
      this.characterSelection2.value = 0;
      this.characterSelection1.removeAttribute("disabled");
    });

    this.characterSelection1.addEventListener("change", (event) => {
      if (event.target.value !== 0) {
        while (this.characterSelection2.lastChild) {
          this.characterSelection2.removeChild(
            this.characterSelection2.lastChild
          );
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
    });

    this.characterSelection2.setAttribute("disabled", true);
    this.setControls(true);
    this.loadCharacters(this);
  },

  setControls: function (value) {
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
  },

  loadCharacters: function (context) {
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

            context.characterSelection1.appendChild(option);
            context.characters.push(character);
          }
        });
    } catch (error) {
      console.error(error);
      const option = document.createElement("option");

      option.setAttribute("value", "1");
      option.textContent = "No se encontraron personajes";

      context.characterSelection1.appendChild(option);
    }
  },
};

export default UI;
