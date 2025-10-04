import { OrderResponseDto } from "../../domain/dtos/OrderResponseDto.js";

/// <summary>
/// Caso de uso: Confirmar una orden a partir del carrito.
/// </summary>
export class CheckoutOrder {
  constructor(cartRepository, orderRepository) {
    this.cartRepository = cartRepository;
    this.orderRepository = orderRepository;
  }

   async execute(userId) {
    // 1. Obtener carrito del usuario
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart || !cart.items || cart.items.length === 0) {
      throw { status: 400, message: "El carrito está vacío" };
    }

    // 2. Validar stock
    for (const item of cart.items) {
      if (item.quantity > item.product.stock) {
        throw { status: 400, message: `Stock insuficiente para ${item.product.name}` };
      }
    }

    // 3. Crear orden y descontar stock en transacción
    const order = await this.orderRepository.createFromCart(cart);

    // 4. Retornar DTO
    return new OrderResponseDto(order);
  }
}
