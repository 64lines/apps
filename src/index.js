#!/usr/bin/env node
import chalk from "chalk";
import yargs from "yargs/yargs";
import path from "path";
import { fileURLToPath } from 'url';
import { hideBin } from "yargs/helpers";
import { Persistence, Value } from "./models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PERSISTENCE_LOCATION = path.join(__dirname, "../data/data.json");

// Define your commands using yargs
yargs(hideBin(process.argv))
  .command("list", "List all the applications", () => {
    const persistence = Persistence(PERSISTENCE_LOCATION);
    console.log(`${chalk.blue("==>")} ${chalk.bold.white("Apps:")}\n`);
    const appsList = persistence.getAll();

    if (!appsList.length) {
      console.log(chalk.yellow(`(i) No applications available.\n`));
      return;
    }

    appsList.forEach((item) => {
      console.log(
        `${chalk.yellow(`${item.id}.`)} ${chalk.bold.green(item.name)}: ${
          item.description
        }`
      );
    });

    // Additional Space
    console.log("");
  })
  .command(
    "add",
    "Add a new application",
    {
      name: {
        alias: "n",
        description: "Application name",
        type: "string",
        demandOption: true,
      },
      description: {
        alias: "d",
        description: "Application description",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      const persistence = Persistence(PERSISTENCE_LOCATION);
      const name = argv.name;
      const description = argv.description;
      persistence.create({ name, description });
      console.log(
        chalk.bold.yellow(`\nThe new App \"${name}\" was created!\n`)
      );
    }
  )
  .command(
    "remove",
    "Remove an application",
    {
      id: {
        describe: "Application id",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => {
      const persistence = Persistence(PERSISTENCE_LOCATION);
      const id = Number(argv.id);
      const application = persistence.get(id);
      persistence.delete(id);
      console.log(
        chalk.bold.red(`\nThe new App \"${application.name}\" was removed!\n`)
      );
    }
  )
  .command("clear", "Remove all applications", (argv) => {
    const persistence = Persistence(PERSISTENCE_LOCATION);
    const application = persistence.clear();
    console.log(
      chalk.bold.red(
        `\nAll the applications were removed from the database!\n`
      )
    );
  })
  .help()
  .demandCommand()
  .parse();
