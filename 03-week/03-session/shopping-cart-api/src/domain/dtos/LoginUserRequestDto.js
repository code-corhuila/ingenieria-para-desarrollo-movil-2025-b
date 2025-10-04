// src/domain/dtos/LoginUserRequestDto.js
/// <summary>
/// DTO de entrada para el login.
/// Contiene solo email y password.
/// </summary>
export class LoginUserRequestDto {
  constructor({ email, password }) {
    if (!email || !password) {
      throw new Error("Email y contraseña son requeridos");
    }
    this.email = email;
    this.password = password;
  }
}
