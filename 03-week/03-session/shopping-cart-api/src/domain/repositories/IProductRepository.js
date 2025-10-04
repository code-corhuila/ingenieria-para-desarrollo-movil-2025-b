/// <summary>
/// Contrato para repositorio de productos.
/// </summary>
export class IProductRepository {
  async create(product) { throw new Error("Not implemented"); }
  async update(id, product) { throw new Error("Not implemented"); }
  async findAll() { throw new Error("Not implemented"); }
  async findById(id) { throw new Error("Not implemented"); }
  async delete(id) { throw new Error("Not implemented"); }
  async updateStock(id, quantity) { throw new Error("Not implemented"); }
}
