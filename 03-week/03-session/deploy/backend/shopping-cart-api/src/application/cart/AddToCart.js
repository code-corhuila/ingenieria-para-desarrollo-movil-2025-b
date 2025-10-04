import { AddToCartResponseDto } from "../../domain/dtos/AddToCartResponseDto.js";

/// <summary>
/// Caso de uso: Agregar un producto al carrito.
/// Devuelve el carrito actualizado.
/// </summary>
export class AddToCart {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute(dto) {
    const cart = await this.cartRepository.addItem(dto.userId, dto.productId, dto.quantity);
    return new AddToCartResponseDto(cart.userId, cart.items, cart.total);
  }
}
