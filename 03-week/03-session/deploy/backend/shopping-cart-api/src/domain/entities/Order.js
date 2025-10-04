export class Order {
  constructor({ id, userId, total, status, createdAt, items }) {
    this.id = id;
    this.userId = userId;
    this.total = total || 0;
    this.status = status || "PENDING";
    this.createdAt = createdAt || new Date();
    this.items = items || [];
  }

  addItem(orderItem) {
    this.items.push(orderItem);
    this.total += orderItem.unitPrice * orderItem.quantity;
  }

  markAsPaid() {
    this.status = "PAID";
  }
}
