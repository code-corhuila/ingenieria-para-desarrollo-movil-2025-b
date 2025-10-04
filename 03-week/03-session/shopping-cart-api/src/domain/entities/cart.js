/// <summary>
/// Entidad de dominio para el carrito.
/// </summary>
export class Cart {
  constructor({ id, userId, total, items }) {
    this.id = id;
    this.userId = userId;
    this.total = total;
    this.items = items || [];
  }
}
