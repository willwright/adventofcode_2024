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

  const regex = /mul\((\d+,\d+)\)/g;
  const mulParts = [...corruptData.matchAll(regex)];

  let mulResult: number = 0;
  for (const mulpart of mulParts) {
    const a = Number(mulpart[1].split(",")[0]);
    const b = Number(mulpart[1].split(",")[1]);
    mulResult += a * b;
  }
  console.log("Multiplication Result: ", mulResult);
};

main();
