export class OrderItem {
  constructor({ id, orderId, productId, quantity, price, subtotal }) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.subtotal = subtotal;
  }
}