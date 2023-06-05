#!/usr/bin/env node
import chalk from "chalk";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { Persistence, Value } from "./models.js";

// Define your commands using yargs
yargs(hideBin(process.argv))
  .command("list", "List all the applications", () => {
    const persistence = Persistence("./data/data.json");
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
      const persistence = Persistence("./data/data.json");
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
      const persistence = Persistence("./data/data.json");
      const id = Number(argv.id);
      const application = persistence.get(id);
      persistence.delete(id);
      console.log(
        chalk.bold.red(`\nThe new App \"${application.name}\" was removed!\n`)
      );
    }
  )
  .command("clear", "Remove all applications", (argv) => {
    const persistence = Persistence("./data/data.json");
    const application = persistence.clear();
    console.log(
      `${chalk.bold.red(
        `All the applications were removed from the database!`
      )}\n`
    );
  })
  .help()
  .demandCommand()
  .parse();
