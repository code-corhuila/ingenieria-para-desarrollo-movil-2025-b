/// <summary>
/// DTO de salida para ítems del carrito.
/// </summary>
export class CartItemResponseDto {
  constructor({ id, productId, quantity, subtotal, product }) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
    this.subtotal = Number(subtotal);

    this.product = product
      ? {
          id: product.id,
          name: product.name,
          price: Number(product.price),
        }
      : null;
  }
}