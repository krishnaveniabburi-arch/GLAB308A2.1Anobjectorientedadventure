// PART 1: OBJECT VERSION
// ===============================

const adventurer = {
name: "Robin",
health: 10,
inventory: ["sword", "potion", "artifact"],

companion: {
    name: "Leo",
type: "Cat",
companion: {
name: "Frank",
type: "Flea",
inventory: ["small hat", "sunglasses"]
}
},

roll(mod = 0) {
const result = Math.floor(Math.random() * 20) + 1 + mod;
console.log(`${this.name} rolled a ${result}.`);
}
};

adventurer.inventory.forEach(i => console.log(i));

adventurer.roll();
adventurer.roll(2);
adventurer.roll(-1);









// ===============================
// PART 2: BASE CLASS
// ===============================

class Character {

    static MAX_HEALTH = 100;

constructor(name) {
this.name = name;
this.health = Character.MAX_HEALTH;
this.inventory = [];
}

roll(mod = 0) {
const result = Math.floor(Math.random() * 20) + 1 + mod;
console.log(`${this.name} rolled a ${result}.`);
return result;
}

static isAlive(character) {
return character.health > 0;
}
}






// PART 3 + 4: ADVENTURER


class Adventurer extends Character {

static ROLES = ["Fighter", "Healer", "Wizard"];

constructor(name, role) {
super(name);

if (!Adventurer.ROLES.includes(role)) {
throw new Error(`Invalid role`);
}

this.role = role;
this.level = 1;
this.xp = 0;
this.gold = 50;

this.inventory.push("bedroll", "50 gold coins");
}

scout() {
console.log(`${this.name} is scouting...`);
return this.roll();
}

gainXP(amount) {
this.xp += amount;
if (this.xp >= 100) this.levelUp();
}

levelUp() {
this.level++;
this.xp = 0;
this.health = Character.MAX_HEALTH;
console.log(`${this.name} leveled up!`);
}

rest() {
this.health = Character.MAX_HEALTH;
console.log(`${this.name} rests.`);
}

static createRandom(name) {
const role = Adventurer.ROLES[Math.floor(Math.random() * Adventurer.ROLES.length)];
return new Adventurer(name, role);
}
static startingGold = 50;
}





// ===============================
// PART 3: COMPANION
// ===============================

class Companion extends Character {

constructor(name, species) {
super(name);
this.species = species;
this.loyalty = 100;
}

follow() {
console.log(`${this.name} follows.`);
}

assistScout() {
return this.roll(2);
}

changeLoyalty(amount) {
this.loyalty += amount;
}
}





// ===============================
// PART 5: FACTORY
// ===============================

class AdventurerFactory {

constructor(role) {
this.role = role;
this.adventurers = [];
}
generate(name) {
const adv = new Adventurer(name, this.role);
this.adventurers.push(adv);
return adv;
}

findByName(name) {
return this.adventurers.find(a => a.name === name);
}
findByIndex(i) {
return this.adventurers[i];
}
}





// ===============================
// PART 6: DUEL SYSTEM
// ===============================

Adventurer.prototype.duel = function(opponent) {

console.log(`\n ${this.name} vs ${opponent.name}\n`);

while (this.health > 50 && opponent.health > 50) {

const a = this.roll();
const b = opponent.roll();

console.log(`${this.name}: ${a} | ${opponent.name}: ${b}`);

if (a > b) opponent.health--;
else if (b > a) this.health--;

console.log(`${this.name} HP: ${this.health} | ${opponent.name} HP: ${opponent.health}`);
}

const winner = this.health > opponent.health ? this.name : opponent.name;

console.log(`Winner: ${winner}\n`);
return winner;
};









// ===============================
// PART 7: ENEMY CLASS
// ===============================

class Enemy extends Character {

constructor(name, type) {
super(name);
this.type = type;
this.health = 50;
}

attack(target) {
const dmg = this.roll();
console.log(`${this.name} attacks ${target.name} (${dmg})`);
target.health -= 1;
}
}









// ===============================
// PART 7: WORLD SETUP (FACTORIES)
// ===============================

const fighters = new AdventurerFactory("Fighter");
const wizards = new AdventurerFactory("Wizard");
const healers = new AdventurerFactory("Healer");









// ===============================
// CREATE PARTY
// ===============================

const robin = fighters.generate("Robin");
const alice = healers.generate("Alice");
const merlin = wizards.generate("Merlin");
const cara = fighters.generate("Cara");









// ===============================
// COMPANIONS
// ===============================

robin.companion = new Companion("Leo", "Cat");
alice.companion = new Companion("Nurse-Bot", "Automaton");
merlin.companion = new Companion("Spark", "Fire Sprite");
cara.companion = new Companion("Rex", "Wolf");

robin.companion.companion = new Companion("Frank", "Flea");









// ===============================
// ADVENTURE SIMULATION
// ===============================

console.log("\nADVENTURE BEGINS\n");

robin.scout();
alice.rest();
merlin.roll();
cara.scout();









// companions
robin.companion.follow();
alice.companion.changeLoyalty(5);









// duel
robin.duel(cara);









// enemy encounter
console.log("\nENEMY APPEARS\n");

const dragon = new Enemy("Smolder", "Dragon");

dragon.attack(robin);
dragon.attack(alice);

console.log(
`HP → Robin: ${robin.health}, Alice: ${alice.health}`
);









// regroup
console.log("\nREGROUP\n");

robin.rest();
alice.rest();
cara.rest();

console.log("Adventure continues...\n");





