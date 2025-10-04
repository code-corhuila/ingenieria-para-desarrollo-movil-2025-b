import { CartResponseDto } from "../../domain/dtos/CartResponseDto.js";

/// <summary>
/// Caso de uso: Eliminar un ítem del carrito.
/// </summary>
export class RemoveFromCart {
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }

    async execute(cartItemId) {
        const cart = await this.cartRepository.removeItem(cartItemId);
        return new CartResponseDto(cart.userId, cart.items, cart.total);
    }
}
