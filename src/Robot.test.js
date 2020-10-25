const { default: Robot } = require("./Robot");

test("robot init without face", () => {
  const robot = new Robot();
  expect(robot.face).toBe(Robot.NORTH);
});

test("robot init with valid face", () => {
  const robot = new Robot(Robot.SOUTH);
  expect(robot.face).toBe(Robot.SOUTH);
});

test("robot init with invalid face", () => {
  expect(() => {
    const robot = new Robot("sooooouth");
  }).toThrow("Invalid direction");
});

test("robot turns correctly", () => {
  const robot = new Robot(Robot.SOUTH);
  robot.turn("LEFT");
  expect(robot.face).toBe(Robot.EAST);
  robot.turn("LEFT");
  expect(robot.face).toBe(Robot.NORTH);
  robot.turn("LEFT");
  expect(robot.face).toBe(Robot.WEST);
  robot.turn("LEFT");
  expect(robot.face).toBe(Robot.SOUTH);
  robot.turn("RIGHT");
  expect(robot.face).toBe(Robot.WEST);
  robot.turn("RIGHT");
  expect(robot.face).toBe(Robot.NORTH);
  robot.turn("RIGHT");
  expect(robot.face).toBe(Robot.EAST);
  robot.turn("RIGHT");
  expect(robot.face).toBe(Robot.SOUTH);
});

test("should throw an error if called without an arg", () => {
  const robot = new Robot(Robot.SOUTH);
  expect(() => {
    robot.turn();
  }).toThrow("Invalid direction");
});

test("should throw an error if called with an unexpected arg", () => {
  const robot = new Robot(Robot.SOUTH);
  expect(() => {
    robot.turn("leeeft");
  }).toThrow("Invalid direction");
});
