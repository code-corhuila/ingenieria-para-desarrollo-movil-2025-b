export class User {
  constructor({ id, email, passwordHash, name, role, createdAt }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.name = name;
    this.role = role || "CUSTOMER";
    this.createdAt = createdAt || new Date();
  }
}
