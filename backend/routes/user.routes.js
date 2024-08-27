import express from "express";
const router = express.Router();

import User from "../controllers/User.controller.js";
import upload from "../middlewares/multer.js";
import authMiddleware from "../middlewares/auth.js";

router.post("/register_user", upload.single("profile_pic"), User.registerUser);

router.post("/login", User.login);
router.post("/logout", authMiddleware, User.logout);

export default router;
