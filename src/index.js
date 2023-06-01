#!/usr/bin/env node
import yargs from "yargs/yargs";
// import clear from "clear";
import chalk from "chalk";
// import figlet from "figlet";
import path from "path";
// import { exec } from "child_process";
import fs from "fs";

const Value = (value) => ({
  is: (secondValue) => value === secondValue,
  isNot: (secondValue) => value !== secondValue,
  isGreatherThan: (secondValue) => value > secondValue,
  isLowerThan: (secondValue) => value < secondValue,
});

const getApps = () => {
  const dataFile = fs.readFileSync("./data/data.json", "utf-8")
  const parsedData = JSON.parse(dataFile);
  return parsedData.apps;
};

const runListCommand = (command) => {
  const apps = getApps();
  console.log(`${chalk.blue("==>")} ${chalk.bold.white("Apps:")}\n`);
  apps.forEach((item) => {
    console.log(
      `${chalk.yellow("*")} ${chalk.bold.green(item.name)}: ${item.description}`
    );
  });

  console.log("");
};

const run = () => {
  const command = process.argv[2];
  const apps = getApps();

  if (Value(command).is("list")) {
    runListCommand(command);
    return;
  }

  if (Value(command).is("add")) {
  }
  // console.log();
};

run();
