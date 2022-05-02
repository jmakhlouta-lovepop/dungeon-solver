import { InitialHeroPower } from "./game-constants.js";

export class Hero {
  _power;

  constructor(initialHeroPower = InitialHeroPower) {
    this._power = initialHeroPower;
  }

  useSacrifice(sacrificePower) {
    this._power = this.power - 1 + sacrificePower;
  }

  get power() {
    return this._power;
  }
}
