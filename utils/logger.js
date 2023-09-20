const chalk = require("chalk");

exports.loggerMiddleware = (req, res, next) => {
  const currentDate = new Date();
  console.log(chalk.blue(`${req.method} ${req.path} - ${currentDate}`));
  next();
};

exports.logError = (name, error) => {
  console.log(chalk.greenBright(name));
  console.log(error);
};

exports.appLogger = (name, data) => {
  console.log(chalk.yellow(name));
  console.log(data);
};
