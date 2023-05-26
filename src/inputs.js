import inquirer from "inquirer";

export const askAppName = () => {
  return inquirer.prompt([
    {
      name: "appName",
      type: "input",
      message: "Enter the name of your app:",
      validate: function (value) {
        return value.length ? true : false;
      },
    },
    {
      name: "appLocation",
      type: "input",
      message: "Enter the location of your app:",
      validate: function (value) {
        return value.length ? true : false;
      },
    },
  ]);
};

export const askAndroidStudioInstallation = () => {
  return inquirer.prompt({
    name: "isASInstalled",
    type: "confirm",
    message: "Have you installed Android Studio?"
  })
}

export const askIonicInstallation = () => {
  return inquirer.prompt({
    name: "isIonicInstalled",
    type: "confirm",
    message: "Have you installed Ionic?"
  })
}
