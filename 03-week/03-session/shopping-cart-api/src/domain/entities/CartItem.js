/// <summary>
/// Entidad de un ítem en el carrito.
/// Incluye información del producto y el subtotal calculado.
/// </summary>
export class CartItem {
  constructor({ id, userId, productId, quantity, product }) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
    this.product = product
      ? {
          id: product.id,
          name: product.name,
          price: product.price
        }
      : null;

    this.subtotal = product ? product.price * quantity : 0; 
  }
}
