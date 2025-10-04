import { OrderResponseDto } from "../../domain/dtos/OrderResponseDto.js";

/// <summary>
/// Caso de uso: Obtener todas las órdenes de un usuario.
/// </summary>
export class GetOrdersByUser {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  /// <summary>
  /// Ejecuta la búsqueda de órdenes de un usuario.
  /// </summary>
  /// <param name="userId">UUID del usuario.</param>
  /// <returns>Lista de órdenes como DTOs.</returns>
  async execute(userId) {
    const orders = await this.orderRepository.findByUser(userId);

    if (!orders || orders.length === 0) {
      return [];
    }

    return orders.map(o => new OrderResponseDto(o));
  }
}
