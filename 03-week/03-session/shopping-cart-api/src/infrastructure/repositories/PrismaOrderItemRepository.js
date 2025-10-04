import prisma from "../../config/prisma.js";
import { OrderItem } from "../../domain/entities/OrderItem.js";
import { IOrderItemRepository } from "../../domain/repositories/IOrderItemRepository.js";

/// <summary>
/// Implementación de IOrderItemRepository usando Prisma.
/// </summary>
export class PrismaOrderItemRepository extends IOrderItemRepository {
    async create(data) {
        const item = await prisma.orderItem.create({ data });
        return new OrderItem(item);
    }

    async findByOrder(orderId) {
        const items = await prisma.orderItem.findMany({ where: { orderId } });
        return items.map(i => new OrderItem(i));
    }

    async cancel(order) {
        const cancelled = await prisma.$transaction(async (tx) => {
            // 1. Devolver stock
            for (const item of order.items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { increment: item.quantity } },
                });
            }

            // 2. Actualizar estado de la orden
            const updatedOrder = await tx.order.update({
                where: { id: order.id },
                data: { status: "CANCELLED" },
                include: { items: true }
            });

            return updatedOrder;
        });

        return new Order(cancelled);
    }

}
