import readline from "readline";
import fs from "fs";

type Report = {
  levels: number[];
};

type Reports = Report[];

const readInputFile = (filePath: string): Promise<Reports> => {
  return new Promise((resolve, reject) => {
    const reports: Reports = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    rl.on("line", (line) => {
      const report: Report = {
        levels: [],
      };
      report.levels = line.split(" ");
      report.levels = report.levels.map(Number);
      reports.push(report);
    });

    rl.on("close", () => {
      resolve(reports);
    });

    rl.on("error", (error) => {
      reject(error);
    });
  });
};

const isSlopeConstant = (
  isDecreasing: boolean,
  isIncreasing: boolean,
  level1: number,
  level2: number
): boolean => {
  if (isDecreasing && level1 > level2) {
    return true;
  }

  if (isIncreasing && level1 < level2) {
    return true;
  }

  return false;
};

const isRateSafe = (level1: number, level2: number): boolean => {
  if (Math.abs(level1 - level2) > 3) {
    return false;
  }

  return true;
};

const isSafeReport = (report: Report): boolean => {
  let isDecreasing = false;
  let isIncreasing = false;

  if (report.levels[0] > report.levels[1]) {
    isDecreasing = true;
  }

  if (report.levels[0] < report.levels[1]) {
    isIncreasing = true;
  }

  for (let i = 0; i < report.levels.length - 1; i++) {
    if (
      !isSlopeConstant(
        isDecreasing,
        isIncreasing,
        report.levels[i],
        report.levels[i + 1]
      )
    ) {
      return false;
    }

    if (!isRateSafe(report.levels[i], report.levels[i + 1])) {
      return false;
    }
  }

  return true;
};

const main = async () => {
  const data = await readInputFile("./input.txt");

  const safeReports = data.filter((report) => {
    if (isSafeReport(report)) {
      return true;
    } else {
      for (let j = 0; j < report.levels.length; j++) {
        const dampedReport = JSON.parse(JSON.stringify(report));
        dampedReport.levels.splice(j, 1);

        if (isSafeReport(dampedReport)) {
          return true;
        }
      }
    }

    return false;
  });

  console.log("Number of safe reports: ", safeReports.length);
};

main();
