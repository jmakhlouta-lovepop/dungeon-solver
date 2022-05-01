export class DungeonSolver {
  static SolveForMinimumNumberOfSacrifices(
    numRooms,
    rooms_power,
    rooms_type,
    heroStartingPower = 1
  ) {
    const sortedPowerList = [];

    let numSacrifices = 0;
    let heroPower = heroStartingPower;

    for (let i = 0; i < numRooms; i++) {
      const roomType = rooms_type[i];
      const roomPower = rooms_power[i];

      if (DungeonSolver.isMonsterRoom(roomType)) {
        while (!DungeonSolver.tryFight(heroPower, roomPower)) {
          if (DungeonSolver.canSacrifice(sortedPowerList)) {
            heroPower = DungeonSolver.takeSacrifice(sortedPowerList, heroPower);
            numSacrifices++;
          } else {
            return -1;
          }
        }
      } else if (DungeonSolver.isSacrificeRoom(roomType)) {
        DungeonSolver.updatePowerList(sortedPowerList, roomPower);
      }
    }

    return numSacrifices;
  }

  static tryFight(heroPower, monsterPower) {
    return heroPower > monsterPower;
  }

  static canSacrifice(sortedPowerList) {
    return sortedPowerList.length > 0;
  }

  static takeSacrifice(powerList, heroPowerBefore) {
    const largestSacrifice = powerList.pop();
    const heroPowerAfter = heroPowerBefore - 1 + largestSacrifice;

    console.log({
      msg: "Retroactive sacrifice",
      powerList,
      largestSacrifice,
      heroPowerBefore,
      heroPowerAfter,
    });

    return heroPowerAfter;
  }

  static updatePowerList(powerList, power) {
    if (power < 1) {
      return;
    }

    console.log({ msg: "Updating power list", powerList, power });

    powerList.push(power);
    powerList.sort();

    console.log({ msg: "Updated power list", powerList });
  }

  static isMonsterRoom(roomType) {
    return roomType === 2;
  }

  static isSacrificeRoom(roomType) {
    return roomType === 1;
  }
}
