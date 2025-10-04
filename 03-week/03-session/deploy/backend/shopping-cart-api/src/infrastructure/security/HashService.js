import bcrypt from "bcrypt";

/// <summary>
/// Servicio de hashing con bcrypt.
/// </summary>
export class HashService {
  async hash(password) {
    return await bcrypt.hash(password, 10);
  }

  async compare(password, hashed) {
    return await bcrypt.compare(password, hashed);
  }
}
