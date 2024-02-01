export default class Character {
  constructor(name, type) {
    this.getName(name);
    this.getType(type);
    this.health = 100;
    this.level = 1;
    this.attack = 0;
    this.defence = 0;
  }

  getName(value) {
    if (typeof (value) === 'string' && value.length >= 2 && value.length <= 10) {
      this.name = value;
    } else {
      throw new Error('Name must be a string with the length from 2 to 10');
    }
  }

  getType(value) {
    const types = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
    if (types.includes(value)) {
      this.type = value;
    } else {
      throw new Error('Wrong type');
    }
  }

  levelUp() {
    if (this.health > 0) {
      this.health = 100;
      this.level += 1;
      this.attack += (this.attack * 0.2);
      this.defence += (this.defence * 0.2);
    } else {
      throw new Error('Can not increase the level of deceased');
    }
  }

  damage(points) {
    if (this.health >= 0) {
      this.health -= points * (1 - this.defence / 100);
    }
  }
}
