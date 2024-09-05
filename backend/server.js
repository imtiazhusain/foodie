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
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import path from "path";
import { SERVER_URL } from "./config/index.js";
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by");
connectDB();

// this line is for deployment purpose it will give us root directory
const rootDirectory = path.resolve();

// CORS
app.use(cors());

// this line is for deployment
app.use(express.static(rootDirectory + "/frontend/dist"));

// Use the function with import.meta.url to get the current directory
const __dirname = getDirname(import.meta.url, path);
app.use("/images", express.static(__dirname + "/public"));
app.use("/api/user", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use(errorHandler);

// all routes that does not match then this will be called but commented for deployment purpose because of we send index.html file if no path matched
app.use("/api*", (req, res) => {
  res.status(404).json({ status: "ERROR", message: "Page not Found" });
});

// this line is for deployment
app.get("*", (req, res) => {
  res.sendFile(path.join(rootDirectory, "frontend", "dist", "index.html"));
});
const server = app.listen(PORT, () => {
  console.log(`app is listening at ${SERVER_URL}`);
});
