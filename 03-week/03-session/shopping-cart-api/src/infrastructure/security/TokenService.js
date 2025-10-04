import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/// <summary>
/// Servicio para generar y validar JWT.
/// </summary>
export class TokenService {
  generate(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  }

  verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
