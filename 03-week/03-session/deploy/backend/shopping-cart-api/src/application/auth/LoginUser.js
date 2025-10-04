import { LoginUserResponseDto } from "../../domain/dtos/LoginUserResponseDto.js";
/// <summary>
/// Caso de uso: Iniciar sesión de usuario.
/// Valida email y contraseña.
/// </summary>
export class LoginUser {
  constructor(userRepository, hashService, tokenService) {
    this.userRepository = userRepository;
    this.hashService = hashService;
    this.tokenService = tokenService;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw { status: 401, message: "Credenciales inválidas" };

    const validPassword = await this.hashService.compare(password, user.passwordHash);
    if (!validPassword) throw { status: 401, message: "Credenciales inválidas" };

    const token = this.tokenService.generate({ id: user.id, role: user.role });

     // 👇 Retornamos un DTO de salida
    return new LoginUserResponseDto({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  }
}
