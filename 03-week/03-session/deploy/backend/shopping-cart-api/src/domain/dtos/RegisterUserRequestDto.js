// src/domain/dtos/RegisterUserRequestDto.js
/// <summary>
/// DTO de entrada para registro de usuario.
/// Valida los campos requeridos.
/// </summary>
export class RegisterUserRequestDto {
  constructor({ name, email, password, role }) {
    if (!name) throw new Error("El nombre es requerido");
    if (!email) throw new Error("El email es requerido");
    if (!password) throw new Error("La contraseña es requerida");

    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role || "CUSTOMER"; // valor por defecto
  }
}
