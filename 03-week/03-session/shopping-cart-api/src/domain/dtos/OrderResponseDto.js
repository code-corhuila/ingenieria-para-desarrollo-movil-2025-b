export class OrderResponseDto {
  constructor(order) {
    this.id = order.id;
    this.userId = order.userId;
    this.total = order.total;
    this.status = order.status;
    this.createdAt = order.createdAt;
    this.items = order.items.map(i => ({
      productId: i.productId,
      quantity: i.quantity,
      price: i.price,
      subtotal: i.subtotal
    }));
  }
}