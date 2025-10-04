// src/domain/dtos/LoginUserResponseDto.js
/// <summary>
/// DTO de salida para el login.
/// Devuelve solo los campos necesarios del usuario y el token.
/// </summary>
export class LoginUserResponseDto {
  constructor({ id, name, email, role, token }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.token = token;
  }
}
