import { RegisterUser } from "../../../application/auth/RegisterUser.js";
import { LoginUser } from "../../../application/auth/LoginUser.js";
import  {PrismaUserRepository}  from "../../../infrastructure/repositories/PrismaUserRepository.js";
import { HashService } from "../../../infrastructure/security/HashService.js";
import { TokenService } from "../../../infrastructure/security/TokenService.js";

const userRepository = new PrismaUserRepository();
const hashService = new HashService();
const tokenService = new TokenService();

const registerUser = new RegisterUser(userRepository, hashService);
const loginUser = new LoginUser(userRepository, hashService, tokenService);

/// <summary>
/// Controlador Auth: Maneja registro y login
/// </summary>
export const authController = {
  /// <summary>
  /// POST /auth/register
  /// </summary>
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const user = await registerUser.execute({ email, password, name });
      res.status(201).json({ message: "Usuario registrado", user });
    } catch (err) {
      next(err);
    }
  },

  /// <summary>
  /// POST /auth/login
  /// </summary>
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await loginUser.execute({ email, password });
      res.status(200).json({ message: "Login exitoso", ...result });
    } catch (err) {
      next(err);
    }
  }
};
