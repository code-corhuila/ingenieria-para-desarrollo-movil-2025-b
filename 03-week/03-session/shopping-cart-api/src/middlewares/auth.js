import { TokenService } from "../infrastructure/security/TokenService.js";

const tokenService = new TokenService();

/// <summary>
/// Middleware para proteger rutas
/// </summary>
export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ message: "Token requerido" });

    const token = header.split(" ")[1];
    const payload = tokenService.verify(token);

    req.user = payload; // inyecta usuario autenticado
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
