import SortedArray from "sorted-array";
import { SacrificeCost } from "../game/game-constants.js";

export class SacrificeTracker {
  _powerLevels = new SortedArray([]);
  _numSacrifices = 0;

  constructor() {}

  takeNext() {
    if (!this.any) {
      throw new Error("No sacrifices remaining");
    }

    const power = this._powerLevels.array.pop();
    this._numSacrifices++;
    return power;
  }

  add(power) {
    if (power <= SacrificeCost) {
      console.debug({
        msg: "Ignoring sacrifice option. Sacrifice would not yield more than its cost. ",
        power,
        SacrificeCost,
      });

      return;
    }

    // Remarks: inefficient - to keep the array sorted, we're re-sorting after every add.
    // Better to use a proper sorted array.
    this._powerLevels.insert(power);
  }

  get any() {
    return this._powerLevels.array.length > 0;
  }

  get numSacrifices() {
    return this._numSacrifices;
  }
}
