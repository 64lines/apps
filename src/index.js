#!/usr/bin/env node
import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
import path from "path";
import { exec } from "child_process";
import {
  askAppName,
  askAndroidStudioInstallation,
  askIonicInstallation,
} from "./inputs.js";

clear();
console.log(chalk.green(figlet.textSync("MAPA")));
console.log(chalk.bold.yellow("Mobile Application Project Assistant"));

const run = async () => {
  const { appName, appLocation } = await askAppName();
  const { isASInstalled } = await askAndroidStudioInstallation();
  if (!isASInstalled) {
    await exec("open https://developer.android.com/studio");
  }
  const { isIonicInstalled } = await askIonicInstallation();

  if (!isIonicInstalled) {
    await exec("yarn global add @ionic/cli");
  }

  if (appLocation) {
    await exec(`git clone git@github.com:64lines/PlusOne.git "${path.join(appLocation, appName)}"`)
    console.log(chalk.bold.green("Project Created!"));
  }
  console.log(appLocation)
};

run();
