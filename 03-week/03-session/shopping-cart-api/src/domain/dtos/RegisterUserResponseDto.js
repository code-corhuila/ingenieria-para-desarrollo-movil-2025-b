// src/domain/dtos/RegisterUserResponseDto.js
/// <summary>
/// DTO de salida para el registro de usuario.
/// Devuelve datos públicos del usuario recién creado.
/// </summary>
export class RegisterUserResponseDto {
  constructor({ id, name, email, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
