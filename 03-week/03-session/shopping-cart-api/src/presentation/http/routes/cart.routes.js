// src/presentation/http/routes/cart.routes.js
import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";

const router = Router();

/// <summary>
/// Rutas del carrito de compras.
/// </summary>

// Agregar producto al carrito
router.post("/", CartController.add);

// Actualizar cantidad de un ítem
router.put("/", CartController.update);

// Eliminar un ítem del carrito
router.delete("/removeItem/:cartItemId", CartController.removeItem);

// Vaciar carrito completo por usuario
router.delete("/clear/:userId", CartController.clear);

// Obtener todos los ítems del carrito de un usuario
router.get("/:userId", CartController.getByUser);

export default router;
