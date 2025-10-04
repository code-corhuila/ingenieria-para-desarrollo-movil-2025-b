import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

const router = Router();

/// <summary>
/// Rutas para gestión de productos.
/// </summary>
router.post("/", (req, res) => ProductController.create(req, res));
router.put("/:id", (req, res) => ProductController.update(req, res));
router.get("/", (req, res) => ProductController.getAll(req, res));
router.get("/:id", (req, res) => ProductController.getById(req, res));
router.delete("/:id", (req, res) => ProductController.delete(req, res));

export default router;
