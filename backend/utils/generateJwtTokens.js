import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_SECRET } from "../config/index.js";

const generateJwtTokens = async (user) => {
  try {
    const payload = { _id: user._id };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    return Promise.resolve(accessToken);
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateJwtTokens;
