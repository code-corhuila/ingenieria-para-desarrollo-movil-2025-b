import  prisma  from "../../config/prisma.js";
import { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import { Product } from "../../domain/entities/Product.js";

export class PrismaProductRepository extends IProductRepository {
  async create(product) {
    const created = await prisma.product.create({ data: product });
    return new Product(created);
  }

  async update(id, product) {
    const updated = await prisma.product.update({ where: { id }, data: product });
    return new Product(updated);
  }

  async findAll() {
    const products = await prisma.product.findMany();
    return products.map(p => new Product(p));
  }

  async findById(id) {
    const product = await prisma.product.findUnique({ where: { id } });
    return product ? new Product(product) : null;
  }

  async delete(id) {
    await prisma.product.delete({ where: { id } });
    return true;
  }

  async updateStock(id, quantity) {
    const updated = await prisma.product.update({
      where: { id },
      data: { stock: quantity }
    });
    return new Product(updated);
  }
}
