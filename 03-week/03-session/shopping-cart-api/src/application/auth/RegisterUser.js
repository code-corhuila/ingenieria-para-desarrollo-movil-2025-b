// src/application/use-cases/RegisterUser.js
import { RegisterUserResponseDto } from "../../domain/dtos/RegisterUserResponseDto.js";

/// <summary>
/// Caso de uso: Registrar usuario.
/// Valida existencia previa, encripta contraseña y devuelve DTO de salida.
/// </summary>
export class RegisterUser {
  constructor(userRepository, hashService) {
    this.userRepository = userRepository;
    this.hashService = hashService;
  }

  async execute(registerDto) {
    // 1. Verificar si ya existe usuario con ese email
    const exists = await this.userRepository.findByEmail(registerDto.email);
    if (exists) throw { status: 400, message: "El email ya está registrado" };

    // 2. Encriptar contraseña
    const passwordHash = await this.hashService.hash(registerDto.password);

    // 3. Guardar en el repositorio
    const newUser = await this.userRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      passwordHash,
      role: registerDto.role,
    });

    // 4. Devolver DTO de salida
    return new RegisterUserResponseDto(newUser);
  }
}
