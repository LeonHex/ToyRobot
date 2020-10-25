class Robot {
  static NORTH = "NORTH";
  static SOUTH = "SOUTH";
  static WEST = "WEST";
  static EAST = "EAST";

  static DIRECTIONS = {
    [Robot.NORTH]: {
      left: Robot.WEST,
      right: Robot.EAST
    },
    [Robot.WEST]: {
      left: Robot.SOUTH,
      right: Robot.NORTH
    },
    [Robot.SOUTH]: {
      left: Robot.EAST,
      right: Robot.WEST
    },
    [Robot.EAST]: {
      left: Robot.NORTH,
      right: Robot.SOUTH
    }
  };

  constructor(f) {
    this.init(f);
  }

  init(f = Robot.NORTH) {
    if (Robot.DIRECTIONS.hasOwnProperty(f)) {
      this.face = f;
    } else {
      throw new Error("Invalid direction");
    }
  }

  turn(dir = "") {
    const direction = dir.toLowerCase();
    if (["left", "right"].indexOf(direction) === -1)
      throw new Error("Invalid direction");

    this.face = Robot.DIRECTIONS[this.face][direction];
  }
}

export default Robot;
