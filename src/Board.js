import Robot from "./Robot";

class Board {
  constructor(wid = 5, hei = 5, reportFunc = (val) => console.log(val)) {
    if (wid > 0) this.width = wid;
    if (hei > 0) this.height = hei;
    this.robot = new Robot();
    this.robot_x = undefined;
    this.robot_y = undefined;
    this.robot_ready = false;
    this.reportFunc = reportFunc;
  }

  clear() {
    this.robot_x = undefined;
    this.robot_y = undefined;
    this.robot.init();
    this.robot_ready = false;
  }

  executeCommand(comm) {
    if (
      comm == null ||
      comm.action == null ||
      ["PLACE", "MOVE", "REPORT", "LEFT", "RIGHT"].indexOf(comm.action) === -1
    )
      throw new Error("Invalid command");
    try {
      const { action } = comm;
      if (action === "PLACE") {
        const { x, y, face } = comm;
        this.placeRobot(x, y, face);
      } else if (action === "MOVE") {
        this.moveRobot();
      } else if (action === "REPORT") {
        this.report();
      } else {
        this.turnRobot(action);
      }
    } catch (e) {
      //TODO add error handling logic
      console.log(e.message);
    }
  }

  placeRobot(x = 0, y = 0, face = "NORTH") {
    this.robot.init(face);
    const initX = parseInt(x);
    const initY = parseInt(y);
    if (initX < 0 || initX >= this.width || initY < 0 || initY >= this.height)
      throw new Error("Robot can't be placed");
    this.robot_x = initX;
    this.robot_y = initY;
    this.robot_ready = true;
  }

  moveRobot(val = 1) {
    if (!this.robot_ready)
      throw new Error("Place the robot on the board first");
    const step = parseInt(val);
    if (step <= 0 || isNaN(step)) throw new Error("Invalid step value");
    switch (this.robot.face) {
      case Robot.NORTH:
        if (this.robot_y + step >= this.height) throw new Error("Robot fall");
        this.robot_y += step;
        break;
      case Robot.SOUTH:
        if (this.robot_y - step < 0) throw new Error("Robot fall");
        this.robot_y -= step;
        break;
      case Robot.WEST:
        if (this.robot_x - step < 0) throw new Error("Robot fall");
        this.robot_x -= step;
        break;
      case Robot.EAST:
        if (this.robot_x + step >= this.width) throw new Error("Robot fall");
        this.robot_x += step;
        break;
      default:
    }
  }

  turnRobot(dir) {
    if (!this.robot_ready)
      throw new Error("Place the robot on the board first");
    this.robot.turn(dir);
  }

  report() {
    if (!this.robot_ready)
      throw new Error("Place the robot on the board first");
    const result = `${this.robot_x}, ${this.robot_y}, ${this.robot.face}`;
    if (this.reportFunc) this.reportFunc(result);
  }
}

export default Board;
