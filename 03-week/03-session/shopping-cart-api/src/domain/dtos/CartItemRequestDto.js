/// <summary>
/// DTO base para operaciones sobre ítems de carrito.
/// </summary>
export class CartItemRequestDto {
  constructor({ userId, productId, quantity }) {
    if (!userId) throw new Error("El usuario es requerido");
    if (!productId) throw new Error("El producto es requerido");
    if (!quantity || quantity <= 0) {
      throw new Error("La cantidad debe ser mayor a 0");
    }

    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
  }
}
