"use strict";

function Character(
  name,
  maxHP,
  currentHP,
  attackDamage,
  defense,
  critical,
  attackSpeed,
  img
) {
  this.name = name;
  this.maxHP = maxHP;
  this.currentHP = currentHP;
  this.attackDamage = attackDamage;
  this.defense = defense;
  this.critical = critical;
  this.attackSpeed = attackSpeed;
  this.img = img;
  this.alive = true;
}

Character.prototype.damage = function (amount) {
  this.currentHP -= amount;

  console.log(`${this.name} ha recibido ${amount} puntos de daño.`);
  console.log(`HP: ${this.currentHP <= 0 ? 0 : this.currentHP}.`);

  if (this.currentHP <= 0) {
    this.alive = false;
    console.log(`${this.name} ha sido derrotado.`);
  }
};

Character.prototype.heal = function (amount) {
  this.currentHP += amount;

  if (this.currentHP > this.maxHP) this.currentHP = this.maxHP;

  console.log(`${this.name} se ha curado ${amount} puntos de daño.`);
  console.log(`HP: ${this.currentHP}.`);
};

function Player(
  name,
  maxHP,
  currentHP,
  attackDamage,
  defense,
  critical,
  attackSpeed,
  img
) {
  Character.call(
    this,
    name,
    maxHP,
    currentHP,
    attackDamage,
    defense,
    critical,
    attackSpeed,
    img
  );
}

function Enemy(
  name,
  maxHP,
  currentHP,
  attackDamage,
  defense,
  critical,
  attackSpeed,
  img
) {
  Character.call(
    this,
    name,
    maxHP,
    currentHP,
    attackDamage,
    defense,
    critical,
    attackSpeed,
    img
  );
}

//Make sure that the new sub object is part of the prototype chain
Player.prototype = Object.create(Character.prototype);
Enemy.prototype = Object.create(Character.prototype);

export { Player, Enemy };
