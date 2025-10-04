import { CartResponseDto } from "../../domain/dtos/CartResponseDto.js";

/// <summary>
/// Caso de uso: Obtener carrito por usuario.
/// </summary>
export class GetCartByUser {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute(userId) {
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) return new CartResponseDto(userId, [], 0);
    return new CartResponseDto(cart.userId, cart.items, cart.total);
  }
}
