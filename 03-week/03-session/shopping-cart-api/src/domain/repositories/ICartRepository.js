/// <summary>
/// Interfaz del repositorio de carrito.
/// </summary>
export class ICartRepository {
  async addItem(userId, productId, quantity) {
    throw new Error("Not implemented");
  }

  async updateItem(cartItemId, quantity) {
    throw new Error("Not implemented");
  }

  async removeItem(cartItemId) {
    throw new Error("Not implemented");
  }

  async findByUserId(userId) {
    throw new Error("Not implemented");
  }

  async clear(userId) {
    throw new Error("Not implemented");
  }
}
