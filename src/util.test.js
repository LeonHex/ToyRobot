const { parseCommands } = require("./util");

test("parse commands correctly", () => {
  const result = parseCommands(`MOVE
PLACE 1,2,EAST
MOVE
LEFT
REPORT`);
  expect(result[0].action).toBe("MOVE");
  expect(result[1].action).toBe("PLACE");
  expect(result[1].x).toBe("1");
  expect(result[1].y).toBe("2");
  expect(result[1].face).toBe("EAST");
  expect(result[2].action).toBe("MOVE");
  expect(result[3].action).toBe("LEFT");
  expect(result[4].action).toBe("REPORT");
});

test("filter invalid commands correctly", () => {
  const result = parseCommands(`MOVE1
PLACE 1,2,EAST
MOVE 2
MOVE
LEFT1
REPORT`);
  expect(result[0].action).toBe("PLACE");
  expect(result[0].x).toBe("1");
  expect(result[0].y).toBe("2");
  expect(result[0].face).toBe("EAST");
  expect(result[1].action).toBe("MOVE");
  expect(result[2].action).toBe("REPORT");
});

test("no empty commands", () => {
  expect(() => {
    parseCommands("");
  }).toThrow("Please input commands first");
});

test("filter invalid place command correctly", () => {
  expect(() => {
    parseCommands(`PLACE2 0,0,EAST
PLACE 1,EAST
PLACE 0,0,EeeeAST
PLACE EAST`);
  }).toThrow("No valid command received");
});

test("must have a place command", () => {
  expect(() => {
    const result = parseCommands(`PLACE2 0,0,EAST
PLACE 1,EAST
PLACE 0,0,EeeeAST
PLACE EAST
MOVE
LEFT`);
  }).toThrow("Please include a valid PLACE command");
});
