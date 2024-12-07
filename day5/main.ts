import readline from "readline";
import fs from "fs";

const readInputFile = (filePath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    let input: string[] = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    rl.on("line", (line) => {
      input.push(line);
    });

    rl.on("close", () => {
      resolve(input);
    });

    rl.on("error", (error) => {
      reject(error);
    });
  });
};

const doesPageMatchRule = (rule: string, update: string): boolean => {
  const matchPage = Number(rule.split("|")[0]);
  const comparePage = Number(rule.split("|")[1]);
  const updateArr: number[] = update.split(",").map(Number);

  if (
    updateArr.indexOf(matchPage) === -1 ||
    updateArr.indexOf(comparePage) === -1
  ) {
    return true;
  }

  if (updateArr.indexOf(matchPage) < updateArr.indexOf(comparePage)) {
    return true;
  }

  return false;
};

const doesUpdateMatchAllRules = (rules: string[], update: string): boolean => {
  for (const rule of rules) {
    if (!doesPageMatchRule(rule, update)) {
      return false;
    }
  }

  return true;
};

const main = async () => {
  const correctUpdatesIndex: number[] = [];
  const rulesArr = await readInputFile("./day5/input_rules.txt");
  const updatesArr = await readInputFile("./day5/input_updates.txt");

  // for each number in updatesArr, for each rule in rulesArr, check that all rules are true for the number,
  // if so record the index of the update

  for (const update of updatesArr) {
    if (!doesUpdateMatchAllRules(rulesArr, update)) {
      continue;
    }
    correctUpdatesIndex.push(updatesArr.indexOf(update));
  }

  /**
   * Foreach update in correctUpdatesIndex:
   * get the value in the middle of the array
   * sum them all together
   */

  let sum = 0;
  for (const index of correctUpdatesIndex) {
    sum += updatesArr[index].split(",").map(Number)[
      Math.round(updatesArr[index].split(",").length / 2) - 1
    ];
  }

  console.log("Sum of correct updates: ", sum);
};
main();
