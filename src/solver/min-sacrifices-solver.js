import { SacrificeTracker } from "./sacrifice-tracker.js";
import { Dungeon } from "../game/dungeon.js";
import { fight } from "../game/fight.js";
import { Hero } from "../game/hero.js";

export class MinSacrificesSolver {
  sacrficeTracker = new SacrificeTracker();
  hero = new Hero();

  dungeon;

  constructor(numRooms, rooms_power, rooms_type) {
    this.dungeon = new Dungeon(numRooms, rooms_power, rooms_type);
  }

  solve() {
    console.debug({ msg: "Solver started", dungeon: this.dungeon });

    let currentLocation = this.dungeon.next();
    let locationsEvaluated = 0;
    console.debug({
      msg: "Initial location",
      currentLocation,
      locationsEvaluated,
    });

    while (!currentLocation.end) {
      this.analyzeRoom(currentLocation.room);
      locationsEvaluated++;
      console.debug({ msg: "Location evaluated", locationsEvaluated });

      currentLocation = this.dungeon.next();
      console.debug({
        msg: "Next location ",
        nextLocation: currentLocation,
      });
    }

    console.debug({
      msg: "Solver result",
      result: this.sacrficeTracker.numSacrifices,
    });
    return this.sacrficeTracker.numSacrifices;
  }

  analyzeRoom(room) {
    console.debug({ msg: "Room analysis started", room });

    if (room.isMonsterRoom()) {
      this.evaluateFight(room.power);
      console.debug({
        msg: "Monster room analyzed",
        room,
        hero: this.hero,
      });
    } else if (room.isSacrificeRoom()) {
      this.sacrficeTracker.add(room.power);
      console.debug({
        msg: "Sacrifice room analyzed",
        room,
        sacrificeTracker: this.sacrficeTracker,
      });
    }
  }

  evaluateFight(monsterPower) {
    console.debug({
      msg: "Fight evaluation started",
      hero: this.hero,
      monster: { power: monsterPower },
      sacrificeTracker: this.sacrficeTracker,
    });

    let currentFightResult = fight(this.hero.power, monsterPower);
    while (currentFightResult === "fail") {
      console.debug({
        msg: "Hero cannot defeat monster; sacrifice required",
        currentFightResult,
        hero: this.hero,
        monster: { power: monsterPower },
      });

      this.retroactiveSacrifice();

      currentFightResult = fight(this.hero.power, monsterPower);
    }

    console.debug({
      msg: "Fight evaluation complete",
      sacrificeTracker: this.sacrficeTracker,
    });
  }

  retroactiveSacrifice() {
    try {
      const sacrificePower = this.sacrficeTracker.takeNext();
      this.hero.useSacrifice(sacrificePower);

      console.debug({
        msg: "Sacrifice claimed retroactively",
        sacrificePower,
        hero: this.hero,
        monster: { power: monsterPower },
      });
    } catch (e) {
      throw new Error(
        `Sacrifice required at location ${
          this.dungeon._locationIndex + 1
        }, but retroactive sacrifice failed.`,
        e
      );
    }
  }
}
