import express from "express";
const app = express();
import morgan from "morgan";
import { PORT } from "./config/index.js";
import getDirname from "./utils/getDirName.js";
import connectDB from "./database/connectDB.js";
import errorHandler from "./middlewares/errors/errorHandler.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import foodRoutes from "./routes/food.routes.js";
import path from "path";
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by");
connectDB();

// CORS
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// extra tips
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// Use the function with import.meta.url to get the current directory
const __dirname = getDirname(import.meta.url, path);
console.log(__dirname);
// console.log(express.static(__dirname));
app.use("/images", express.static(__dirname + "/public"));
app.use("/api/user", userRoutes);
app.use("/api/food", foodRoutes);
app.use(errorHandler);
app.use((req, res) => {
  res.status(404).json({ status: "ERROR", message: "Page not Found" });
});

const server = app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
