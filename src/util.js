let placePattern = new RegExp(
  /^(PLACE\b)\s\d+,\d+,((NORTH\b$)|(SOUTH\b$)|(WEST\b$)|(EAST\b$))/
);
let commPattern = new RegExp(/^((MOVE)|(LEFT)|(RIGHT)|(REPORT))$/);

export function parseCommands(comms) {
  if (comms == null || comms === "") {
    throw new Error("Please input commands first");
  }

  let foundPlaceComm = false;
  const validateComms = comms
    .split("\n")
    .filter((comm) => validateSingleComm(comm))
    .map((comm) => {
      if (comm.indexOf("PLACE") > -1) {
        const [x, y, face] = comm.split(" ")[1].split(",");
        foundPlaceComm = true;
        return {
          action: "PLACE",
          x,
          y,
          face
        };
      } else {
        return { action: comm };
      }
    });
  if (validateComms.length === 0) throw new Error("No valid command received");
  if (!foundPlaceComm) throw new Error("Please include a valid PLACE command");
  return validateComms;
}

function validateSingleComm(val) {
  return placePattern.test(val) || commPattern.test(val);
}
