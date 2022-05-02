export class DungeonRoom {
  type;
  power;

  constructor(type, power) {
    this.type = type;
    this.power = power;
  }

  isSacrificeRoom() {
    return this.type === 1;
  }

  isMonsterRoom() {
    return this.type === 2;
  }
}
