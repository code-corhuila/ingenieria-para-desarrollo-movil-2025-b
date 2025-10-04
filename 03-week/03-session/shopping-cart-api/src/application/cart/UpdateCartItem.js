import { CartResponseDto } from "../../domain/dtos/CartResponseDto.js";

/// <summary>
/// Caso de uso: Actualizar la cantidad de un ítem del carrito.
/// </summary>
export class UpdateCartItem {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute(cartItemId, quantity) {
    const cart = await this.cartRepository.updateItem(cartItemId, quantity);
    return new CartResponseDto(cart.userId, cart.items, cart.total);
  }
}
