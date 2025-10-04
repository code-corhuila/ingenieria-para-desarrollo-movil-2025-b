import { CartResponseDto } from "./CartResponseDto.js";

/// <summary>
/// DTO de salida para agregar producto al carrito.
/// Devuelve carrito completo.
/// </summary>
export class AddToCartResponseDto extends CartResponseDto {
  constructor(userId, items, total) {
    super(userId, items, total);
  }
}
