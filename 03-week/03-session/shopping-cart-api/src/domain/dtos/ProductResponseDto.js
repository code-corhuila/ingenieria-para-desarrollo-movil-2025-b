// src/domain/dtos/ProductResponseDto.js
/// <summary>
/// DTO de salida para devolver datos de producto.
/// </summary>
export class ProductResponseDto {
  constructor({ id, name, sku, description, price, stock }) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }
}
