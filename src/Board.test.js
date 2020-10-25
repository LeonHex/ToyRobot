const { default: Board } = require("./Board");
const { default: Robot } = require("./Robot");

test("correctly init board", () => {
  const reportFunc = (msg) => alert(msg);
  const board = new Board(6, 6, reportFunc);
  expect(board.width).toBe(6);
  expect(board.height).toBe(6);
  expect(board.robot.face).toBe(Robot.NORTH);
  expect(board.robot_x).toBe(undefined);
  expect(board.robot_y).toBe(undefined);
  expect(board.robot_ready).toBe(false);
  expect.reportFunc = reportFunc;
});

test("correctly execute command", () => {
  const board = new Board(6, 6, (msg) => alert(msg));
  expect(() => {
    board.executeCommand({});
  }).toThrow("Invalid command");
});

test("correctly place the robot", () => {
  const board = new Board();
  board.placeRobot();
  expect(board.robot.face).toBe(Robot.NORTH);
  expect(board.robot_x).toBe(0);
  expect(board.robot_y).toBe(0);
  expect(board.robot_ready).toBe(true);
});

test("pass valid coordinates to place a robot", () => {
  const board = new Board();
  expect(() => {
    board.placeRobot(6, 10, Robot.NORTH);
  }).toThrow("Robot can't be placed");
});

test("pass valid face to place a robot", () => {
  const board = new Board();
  expect(() => {
    board.placeRobot(3, 3, "noooorth");
  }).toThrow("Invalid direction");
});

test("move a robot before placing it", () => {
  const board = new Board();
  expect(() => {
    board.moveRobot();
  }).toThrow("Place the robot on the board first");
});

test("move a robot with invalid param", () => {
  const board = new Board();
  board.placeRobot();
  expect(() => {
    board.moveRobot(0);
  }).toThrow("Invalid step value");
});

test("move a robot with invalid string param", () => {
  const board = new Board();
  board.placeRobot();
  expect(() => {
    board.moveRobot("test");
  }).toThrow("Invalid step value");
});

test("move a robot to north", () => {
  const board = new Board();
  board.placeRobot();
  board.moveRobot();
  expect(board.robot_y).toBe(1);
});

test("move a robot to south", () => {
  const board = new Board();
  board.placeRobot(2, 2, Robot.SOUTH);
  board.moveRobot();
  expect(board.robot_y).toBe(1);
});

test("move a robot to east", () => {
  const board = new Board();
  board.placeRobot(2, 2, Robot.EAST);
  board.moveRobot();
  expect(board.robot_x).toBe(3);
});

test("move a robot to west", () => {
  const board = new Board();
  board.placeRobot(2, 2, Robot.WEST);
  board.moveRobot();
  expect(board.robot_x).toBe(1);
});

test("ignore the move if the robot should fall out of the board[NORTH face]", () => {
  const board = new Board();
  board.placeRobot();
  expect(() => {
    board.moveRobot(5);
  }).toThrow("Robot fall");
});

test("ignore the move if the robot should fall out of the board[SOUTH face]", () => {
  const board = new Board();
  board.placeRobot(1, 2, Robot.SOUTH);
  expect(() => {
    board.moveRobot(3);
  }).toThrow("Robot fall");
});

test("ignore the move if the robot should fall out of the board[WEST face]", () => {
  const board = new Board();
  board.placeRobot(1, 2, Robot.WEST);
  expect(() => {
    board.moveRobot(2);
  }).toThrow("Robot fall");
});

test("ignore the move if the robot should fall out of the board[EAST face]", () => {
  const board = new Board();
  board.placeRobot(1, 2, Robot.EAST);
  expect(() => {
    board.moveRobot(4);
  }).toThrow("Robot fall");
});

test("turn a robot before placing it", () => {
  const board = new Board();
  expect(() => {
    board.turnRobot();
  }).toThrow("Place the robot on the board first");
});

test("turn a robot without direction", () => {
  const board = new Board();
  board.placeRobot(1, 2, Robot.EAST);
  expect(() => {
    board.turnRobot();
  }).toThrow("Invalid direction");
});

test("turn a robot with invalid direction", () => {
  const board = new Board();
  board.placeRobot(1, 2, Robot.EAST);
  expect(() => {
    board.turnRobot("leeeeft");
  }).toThrow("Invalid direction");
});

test("turn a robot to left", () => {
  const board = new Board();
  board.placeRobot(1, 2, Robot.EAST);
  board.turnRobot("LEFT");
  expect(board.robot.face).toBe(Robot.NORTH);
});

test("report before placing a robot", () => {
  const board = new Board();
  expect(() => {
    board.report();
  }).toThrow("Place the robot on the board first");
});

test("report correctly", () => {
  let result;
  const board = new Board(3, 3, (val) => (result = val));
  board.placeRobot(1, 2, Robot.EAST);
  board.report();
  expect(result).toBe("1, 2, EAST");
});

test("correctly clear the board", () => {
  const board = new Board();
  board.placeRobot(2, 3, Robot.EAST);
  expect(board.robot.face).toBe(Robot.EAST);
  expect(board.robot_x).toBe(2);
  expect(board.robot_y).toBe(3);
  expect(board.robot_ready).toBe(true);
  board.clear();
  expect(board.robot.face).toBe(Robot.NORTH);
  expect(board.robot_x).toBe(undefined);
  expect(board.robot_y).toBe(undefined);
  expect(board.robot_ready).toBe(false);
});
