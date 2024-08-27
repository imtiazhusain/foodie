import { DEBUG_MODE } from "../../config/index.js";
import joi from "joi";

import CustomErrorHandler from "./customErrorHandler.js";

// advanced error handler middlware
const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let data = {
    status: "error",
    message: "Internal server error",
    // user ko orignal message ni show krna hota is leye jb ye produciton may jaye
    // tu .env file May DEBUG_MODE ko false kr dena tu orignal message ni jaye ga
    // but abhi hm development kr rhy so abhi tu chye tu abhi DEBUG_MODE true kiya hva
    ...(DEBUG_MODE == "true" && { orignalError: error.message }),
  };

  //    yhan hm check kr rhy k error jo aya hai khein wo joi library nay tu ni bhja
  // agr us nay bhja hai tu hm status code or data ko us k according change kr rhy
  if (error instanceof joi.ValidationError) {
    console.log("console validation error here");
    statusCode = 422;
    data = {
      status: "error",
      message: error.message,
    };
  }

  //    ye check kry ga k error customErrorHandler ka tu ni hai agr us ka hva
  // tu wo us k according apna status or data ley ley ga
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
