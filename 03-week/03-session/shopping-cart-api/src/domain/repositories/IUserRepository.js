/// <summary>
/// Contrato para repositorio de usuarios.
/// Define las operaciones que cualquier implementación debe cumplir.
/// </summary>
export class IUserRepository {
  /// <summary>
  /// Crear un nuevo usuario.
  /// </summary>
  async create(user) { throw new Error("Not implemented"); }

  /// <summary>
  /// Buscar usuario por email.
  /// </summary>
  async findByEmail(email) { throw new Error("Not implemented"); }

  /// <summary>
  /// Listar todos los usuarios.
  /// </summary>
  async findAll() { throw new Error("Not implemented"); }
}
