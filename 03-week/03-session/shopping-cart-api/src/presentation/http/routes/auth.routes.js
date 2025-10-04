import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const router = Router();

/// <summary>
/// Rutas de autenticación
/// </summary>
router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
