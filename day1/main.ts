import readline from "readline";
import fs from "fs";

const readInputFile = (
  filePath: string
): Promise<{ leftArr: number[]; rightArr: number[] }> => {
  return new Promise((resolve, reject) => {
    const leftArr: number[] = [];
    const rightArr: number[] = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    rl.on("line", (line) => {
      const [a, b] = line.split("   ").map(Number);
      leftArr.push(a);
      rightArr.push(b);
    });

    rl.on("close", () => {
      resolve({
        leftArr: leftArr,
        rightArr: rightArr,
      });
    });

    rl.on("error", (error) => {
      reject(error);
    });
  });
};

const bubbleSort = (arr: number[]): number[] => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

const getdistanceBetweenNumbers = (num1: number, num2: number): number =>
  Math.abs(num1 - num2);

const calcSimilaritySingle = (needle: number, haystack: number[]): number => {
  const matches = haystack.filter((x) => x === needle);
  return matches.length;
};

const main = async () => {
  const data = await readInputFile("./day1/input.txt");

  const sortedLeftArray = bubbleSort(data.leftArr);
  const sortedRightArray = bubbleSort(data.rightArr);

  let similarity = 0;

  for (let i = 0; i < sortedLeftArray.length; i++) {
    const lineSimilarity =
      sortedLeftArray[i] *
      calcSimilaritySingle(sortedLeftArray[i], sortedRightArray);

    similarity += lineSimilarity;
  }

  console.log("Total Similarity: ", similarity);
};

main();
