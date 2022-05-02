import { MinSacrificesSolver } from "./solver/min-sacrifices-solver.js";

const testDungeon1 = {
  numRooms: 3,
  rooms_power: [4, 2, 3],
  rooms_type: [1, 1, 2],
};

console.info({ msg: "Dungeon parameters", testDungeon1 });

const solver = new MinSacrificesSolver(
  testDungeon1.numRooms,
  testDungeon1.rooms_power,
  testDungeon1.rooms_type
);

let result = null;
try {
  result = solver.solve();
  console.info({
    msg: `Solution - Dungeon can be completed with as few as ${result} sacrifices.`,
    result,
  });
  console.debug({ msg: "Solution (Debug)", testDungeon1, solver, result });
} catch (e) {
  console.info({
    msg: `Solution - Dungeon cannot be completed.`,
    result: e.message,
  });
  console.debug({
    msg: "Solution (Debug)",
    testDungeon1,
    solver,
    result: e,
  });
}

process.exit();
