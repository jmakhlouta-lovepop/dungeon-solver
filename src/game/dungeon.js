import { DungeonRoom } from "./dungeon-room.js";

export class Dungeon {
  _locationIndex = -1;

  numRooms;
  rooms_power;
  rooms_type;

  constructor(numRooms, rooms_power, rooms_type) {
    this.numRooms = numRooms;
    this.rooms_power = rooms_power;
    this.rooms_type = rooms_type;
  }

  next() {
    if (!this.hasRoomsRemaining) {
      console.debug({
        msg: "Dungeon - No rooms remaining",
        dungeon: this,
        room: null,
      });

      return {
        room: null,
        end: true,
      };
    }

    this._locationIndex++;

    const room = new DungeonRoom(
      this.rooms_type[this._locationIndex],
      this.rooms_power[this._locationIndex]
    );

    console.debug({
      msg: "Dungeon - Location advanced",
      dungeon: this,
      room,
    });

    return {
      room,
      end: false,
    };
  }

  get roomsRemaining() {
    return this.numRooms - 1 - this._locationIndex;
  }

  get hasRoomsRemaining() {
    return this.roomsRemaining > 0;
  }
}
