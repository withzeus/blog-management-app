import express from "express";
import AuthController from "../core/controllers/auth.controller";

const router = express.Router();

router.post("/login", AuthController.login.bind(AuthController));
router.post("/register", AuthController.register.bind(AuthController));

export default router;
