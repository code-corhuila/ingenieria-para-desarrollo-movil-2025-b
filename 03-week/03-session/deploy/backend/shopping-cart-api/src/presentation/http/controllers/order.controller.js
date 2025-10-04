import { PrismaCartRepository } from "../../../infrastructure/repositories/PrismaCartRepository.js";
import { PrismaOrderRepository } from "../../../infrastructure/repositories/PrismaOrderRepository.js";
import { PrismaProductRepository } from "../../../infrastructure/repositories/PrismaProductRepository.js";

import { CheckoutOrder } from "../../../application/order/CheckoutOrder.js";
import { CancelOrder } from "../../../application/order/CancelOrder.js";
import { GetOrdersByUser } from "../../../application/order/GetOrdersByUser.js";

/// <summary>
/// Controlador de órdenes.
/// Maneja endpoints de creación, checkout, cancelación y consultas.
/// </summary>
export class OrderController {
  /// <summary>
  /// Endpoint: Finalizar checkout de una orden desde el carrito.
  /// </summary>
  static async checkout(req, res) {
    try {
      const { userId } = req.params;

      const repoCart = new PrismaCartRepository();
      const repoOrder = new PrismaOrderRepository();
      const repoProduct = new PrismaProductRepository();

      const useCase = new CheckoutOrder(repoCart, repoOrder, repoProduct);
      const result = await useCase.execute(userId);

      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  /// <summary>
  /// Endpoint: Cancelar una orden y devolver stock.
  /// </summary>
  static async cancel(req, res) {
    try {
      const { orderId } = req.params;

      const repoOrder = new PrismaOrderRepository();
      const useCase = new CancelOrder(repoOrder);

      const result = await useCase.execute(orderId);

      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  /// <summary>
  /// Endpoint: Obtener todas las órdenes de un usuario.
  /// </summary>
  static async getByUser(req, res) {
    try {
      const { userId } = req.params;

      const repoOrder = new PrismaOrderRepository();
      const useCase = new GetOrdersByUser(repoOrder);

      const result = await useCase.execute(userId);

      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
