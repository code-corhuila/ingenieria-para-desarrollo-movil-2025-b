/// <summary>
/// Entidad de producto en el dominio.
/// </summary>
export class Product {
  constructor({ id, name, sku, description, price, stock }) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }
}
