import { DungeonSolver } from "./dungeon/dungeon-solver.js";

const testDungeon1 = {
  numRooms: 3,
  rooms_power: [4, 2, 3],
  rooms_type: [1, 1, 2],
};

console.log({ msg: "Dungeon details", testDungeon1 });

const minimumNumberOfSacrifices =
  DungeonSolver.SolveForMinimumNumberOfSacrifices(
    testDungeon1.numRooms,
    testDungeon1.rooms_power,
    testDungeon1.rooms_type
  );

console.log({ msg: "Solution", testDungeon1, minimumNumberOfSacrifices });
