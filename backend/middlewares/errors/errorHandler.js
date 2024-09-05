import { DEBUG_MODE } from "../../config/index.js";
import joi from "joi";

import CustomErrorHandler from "./customErrorHandler.js";

// advanced error handler middlware
const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let data = {
    status: "error",
    message: "Internal server error",

    ...(DEBUG_MODE == "true" && { orignalError: error.message }),
  };

  if (error instanceof joi.ValidationError) {
    console.log("console validation error here");
    statusCode = 422;
    data = {
      status: "error",
      message: error.message,
    };
  }

  if (error instanceof CustomErrorHandler) {
    statusCode = error.status;
    data = {
      status: "error",
      message: error.message,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
