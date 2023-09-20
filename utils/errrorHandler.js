const winston = require("winston");
const { JsonResponse } = require("./apiResponse");
const { logError } = require("./logger");

module.exports = function (err, req, res, next) {
  logError("Error", err);
  const errorMessage =
    err.msg ||
    (err.response &&
      typeof err.response.message === "string" &&
      err.response.message) ||
    (err.response &&
      err.response.data &&
      typeof err.response.data.message === "string" &&
      err.response.data.message) ||
    err.message ||
    "Something went wrong";
  const statusCode = err.code || err.statusCode || err.response?.status || 500;

  console.log("err ==> ", new Date().getUTCDate(), "<===>", err);

  winston.error(errorMessage, err);
  return JsonResponse(res, statusCode, errorMessage);
};
