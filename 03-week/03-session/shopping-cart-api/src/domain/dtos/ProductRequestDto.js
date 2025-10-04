/// <summary>
/// DTO de entrada para crear o actualizar un producto.
/// </summary>
export class ProductRequestDto {
  constructor({ name, sku, description, price, stock }) {
    if (!name) throw new Error("El nombre es requerido");
    if (!sku) throw new Error("El SKU es requerido");
    if (!price) throw new Error("El precio es requerido");

    this.name = name;
    this.sku = sku;
    this.description = description || "";
    this.price = price;
    this.stock = stock ?? 0;
  }
}
