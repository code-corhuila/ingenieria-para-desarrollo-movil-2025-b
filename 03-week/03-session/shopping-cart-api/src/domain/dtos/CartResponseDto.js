import { CartItemResponseDto } from "./CartItemResponseDto.js";

/// <summary>
/// DTO de salida para el carrito completo.
/// </summary>
export class CartResponseDto {
  constructor(userId, items, total) {
    this.userId = userId;
    this.items = items.map(i => new CartItemResponseDto(i));
    this.total = Number(total);
  }
}
