import prisma from "../../config/prisma.js";
import { User } from "../../domain/entities/User.js";

/// <summary>
/// Repositorio Prisma para usuarios
/// </summary>
export class PrismaUserRepository {
  async create(data) {
    const user = await prisma.user.create({ data });
    return new User(user);
  }

  async findByEmail(email) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? new User(user) : null;
  }

  async findAll() {
    const users = await prisma.user.findMany();
    return users.map(u => new User(u));
  }
}

