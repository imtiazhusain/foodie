import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  DATABASE_URL,
  DEBUG_MODE,
  EMAIL,
  PASS,
  ACCESS_TOKEN_SECRET,
  SERVER_URL,
  STRIPE_SECRET_KEY,
} = process.env;
