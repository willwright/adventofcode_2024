import readline from "readline";
import fs from "fs";

const readInputFile = (filePath: string): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    let input: string[][] = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    rl.on("line", (line) => {
      input.push(line.split(""));
    });

    rl.on("close", () => {
      resolve(input);
    });

    rl.on("error", (error) => {
      reject(error);
    });
  });
};

const sequenceArr = ["X", "M", "A", "S"];
let xmasFoundCounter: number = 0;
let inputArr: string[][] = [];

const holdX = (x: number) => {
  return x;
};
const moveLeft = (x: number) => {
  return x - 1;
};

const moveRight = (x: number) => {
  return x + 1;
};

const holdY = (y: number) => {
  return y;
};
const moveUp = (y: number) => {
  return y - 1;
};

const moveDown = (y: number) => {
  return y + 1;
};

const checkNeighbors = (
  sequencePosition: number = 0,
  x: number,
  y: number,
  xFn: Function,
  yFn: Function
) => {
  if (inputArr[yFn(y)] === undefined) {
    return;
  }
  if (inputArr[yFn(y)][xFn(x)] === undefined) {
    return;
  }
  if (inputArr[yFn(y)][xFn(x)] === sequenceArr[sequencePosition]) {
    if (sequencePosition === 3) {
      xmasFoundCounter++;
      return;
    }
    if (sequencePosition === 0) {
      if (inputArr[x - 1] !== undefined && inputArr[x - 1][y]) {
        checkNeighbors(sequencePosition + 1, x, y, moveLeft, holdY);
      }
      if (
        inputArr[x - 1] !== undefined &&
        inputArr[x - 1][y - 1] !== undefined
      ) {
        checkNeighbors(sequencePosition + 1, x, y, moveLeft, moveUp);
      }
      if (inputArr[x] !== undefined && inputArr[x][y - 1] !== undefined) {
        checkNeighbors(sequencePosition + 1, x, y, holdX, moveUp);
      }
      if (
        inputArr[x + 1] !== undefined &&
        inputArr[x + 1][y - 1] !== undefined
      ) {
        checkNeighbors(sequencePosition + 1, x, y, moveRight, moveUp);
      }
      if (inputArr[x + 1] !== undefined && inputArr[x + 1][y] !== undefined) {
        checkNeighbors(sequencePosition + 1, x, y, moveRight, holdY);
      }
      if (
        inputArr[x + 1] !== undefined &&
        inputArr[x + 1][y + 1] !== undefined
      ) {
        checkNeighbors(sequencePosition + 1, x, y, moveRight, moveDown);
      }
      if (inputArr[x] !== undefined && inputArr[x][y + 1] !== undefined) {
        checkNeighbors(sequencePosition + 1, x, y, holdX, moveDown);
      }
      if (
        inputArr[x - 1] !== undefined &&
        inputArr[x - 1][y + 1] !== undefined
      ) {
        checkNeighbors(sequencePosition + 1, x, y, moveLeft, moveDown);
      }
    } else {
      checkNeighbors(sequencePosition + 1, xFn(x), yFn(y), xFn, yFn);
    }
  }
  return;
};

const getbackwardOpposites = (x: number, y: number) => {
  if (
    inputArr[y - 1] !== undefined &&
    inputArr[y - 1][x - 1] !== undefined &&
    inputArr[y + 1] !== undefined &&
    inputArr[y + 1][x + 1] !== undefined
  ) {
    return [inputArr[y - 1][x - 1], inputArr[y + 1][x + 1]];
  }
};

const getforwardOpposites = (x: number, y: number) => {
  if (
    inputArr[y - 1] !== undefined &&
    inputArr[y - 1][x + 1] !== undefined &&
    inputArr[y + 1] !== undefined &&
    inputArr[y + 1][x - 1] !== undefined
  ) {
    return [inputArr[y - 1][x + 1], inputArr[y + 1][x - 1]];
  } else {
    return [];
  }
};

const isMAS = (x: number, y: number) => {
  if (inputArr[y][x] !== "A") {
    return false;
  }
  const backwardOpposite = getbackwardOpposites(x, y);
  if (backwardOpposite) {
    if (
      backwardOpposite &&
      backwardOpposite.filter((char) => char === "M").length === 1 &&
      backwardOpposite.filter((char) => char === "S").length === 1
    ) {
      const forwardOpposite = getforwardOpposites(x, y);
      if (forwardOpposite) {
        if (
          forwardOpposite &&
          forwardOpposite.filter((char) => char === "M").length === 1 &&
          forwardOpposite.filter((char) => char === "S").length === 1
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

const main = async () => {
  inputArr = await readInputFile("./day4/input.txt");

  for (let i = 0; i < inputArr.length; i++) {
    for (let j = 0; j < inputArr[i].length; j++) {
      if (isMAS(j, i)) {
        xmasFoundCounter++;
      }
    }
  }

  console.log("Total xmas found: ", xmasFoundCounter);
};
main();
