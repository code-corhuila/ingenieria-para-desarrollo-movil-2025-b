import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { errorHandler } from "./middlewares/error.js";
import authRoutes from "./presentation/http/routes/auth.routes.js";
import productRoutes from "./presentation/http/routes/product.routes.js";
import cartRoutes from "./presentation/http/routes/cart.routes.js";
import orderRoutes from "./presentation/http/routes/order.routes.js";

export const app = express();

// Seguridad y middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Resolver rutas absolutas para JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar swagger-output.json
const swaggerFile = JSON.parse(
  readFileSync(path.join(__dirname, "../swagger-output.json"), "utf-8")
);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Rutas principales
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

// Middleware de errores
app.use(errorHandler);
