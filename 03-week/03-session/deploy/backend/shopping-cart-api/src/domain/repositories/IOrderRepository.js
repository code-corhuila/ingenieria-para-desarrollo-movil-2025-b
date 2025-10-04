/// <summary>
/// Contrato para repositorio de órdenes.
/// </summary>
export class IOrderRepository {
  async create(order) { throw new Error("Not implemented"); }
  async findById(id) { throw new Error("Not implemented"); }
  async findByUser(userId) { throw new Error("Not implemented"); }
  async updateStatus(id, status) { throw new Error("Not implemented"); }
  async cancel(orderId) { throw new Error("Not implemented"); }

}
