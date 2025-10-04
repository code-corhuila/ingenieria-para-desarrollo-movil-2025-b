import { OrderResponseDto } from "../../domain/dtos/OrderResponseDto.js";

/// <summary>
/// Caso de uso: Cancelar una orden y devolver stock.
/// </summary>
export class CancelOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId) {
    // 1. Buscar orden
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw { status: 404, message: "Orden no encontrada" };

    // 2. Validar estado
    if (order.status !== "CONFIRMED" && order.status !== "PENDING") {
      throw { status: 400, message: `No se puede cancelar una orden en estado ${order.status}` };
    }

    // 3. Cancelar orden en repositorio
    const cancelledOrder = await this.orderRepository.cancel(order);

    // 4. Retornar DTO
    return new OrderResponseDto(cancelledOrder);
  }
}
