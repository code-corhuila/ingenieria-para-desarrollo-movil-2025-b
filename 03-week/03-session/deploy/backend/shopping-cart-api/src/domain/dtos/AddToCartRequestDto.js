import { CartItemRequestDto } from "./CartItemRequestDto.js";

/// <summary>
/// DTO específico para agregar productos al carrito.
/// </summary>
export class AddToCartRequestDto extends CartItemRequestDto {
  constructor({ userId, productId, quantity }) {
    super({ userId, productId, quantity });
  }
}
