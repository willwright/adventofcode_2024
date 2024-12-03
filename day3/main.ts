import readline from "readline";
import fs from "fs";

const readInputFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let corruptData: string = "";

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    rl.on("line", (line) => {
      corruptData += line;
    });

    rl.on("close", () => {
      resolve(corruptData);
    });

    rl.on("error", (error) => {
      reject(error);
    });
  });
};

const main = async () => {
  const corruptData = await readInputFile("./day3/input.txt");

  const regex = /mul\((\d+,\d+)\)|do\(\)|don't\(\)/g;
  const mulParts = [...corruptData.matchAll(regex)];

  let mulResult: number = 0;
  let doMath: boolean = true;
  for (const mulpart of mulParts) {
    if (mulpart[0] === "do()") {
      doMath = true;
    } else if (mulpart[0] === "don't()") {
      doMath = false;
    } else if (doMath) {
      const a = Number(mulpart[1].split(",")[0]);
      const b = Number(mulpart[1].split(",")[1]);
      mulResult += a * b;
    }
  }
  console.log("Multiplication Result: ", mulResult);
};

main();
