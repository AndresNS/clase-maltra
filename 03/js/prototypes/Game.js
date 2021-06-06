"use strict";

function Game() {
  this.started = false;
  this.gameOver = false;
}

Game.prototype.start = function () {
  this.started = true;
};

Game.prototype.exit = function () {
  this.started = false;
  this.gameOver = false;
};

export default Game;
