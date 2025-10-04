/// <summary>
/// DTO de entrada para actualizar cantidad de un ítem del carrito.
/// </summary>
export class UpdateCartItemRequestDto {
  constructor({ cartItemId, quantity }) {
    if (!cartItemId) throw new Error("El ítem del carrito es requerido");
    if (!quantity || quantity <= 0) throw new Error("La cantidad debe ser mayor a 0");

    this.cartItemId = cartItemId;
    this.quantity = quantity;
  }
}
