import prisma from "../../config/prisma.js";
import { Order } from "../../domain/entities/Order.js";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository.js";

export class PrismaOrderRepository extends IOrderRepository {
    async create(data) {
        const order = await prisma.order.create({
            data,
            include: { items: true }
        });
        return new Order(order);
    }

    async createFromCart(cart) {
        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId: cart.userId,
                    total: cart.total,
                    status: "CONFIRMED",
                    items: {
                        create: cart.items.map((i) => ({
                            productId: i.productId,
                            quantity: i.quantity,
                            unitPrice: i.product.price,
                            subtotal: i.subtotal,
                        })),
                    },
                },
                include: { items: true },
            });

            // Descontar stock
            for (const item of cart.items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } },
                });
            }

            // Vaciar carrito
            await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
            await tx.cart.update({ where: { id: cart.id }, data: { total: 0 } });

            return newOrder;
        });

        return new Order(order);
    }

    async findById(id) {
        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: true }
        });
        return order ? new Order(order) : null;
    }

    async findByUser(userId) {
        const orders = await prisma.order.findMany({
            where: { userId },
            include: { items: true }
        });
        return orders.map(o => new Order(o));
    }

    async updateStatus(id, status) {
        const order = await prisma.order.update({
            where: { id },
            data: { status },
            include: { items: true }
        });
        return new Order(order);
    }

    /// <summary>
    /// Cancela una orden existente y devuelve stock.
    /// </summary>
    async cancel(order) {
        const cancelled = await prisma.$transaction(async (tx) => {
            // 1. Actualizar estado de la orden
            const updatedOrder = await tx.order.update({
                where: { id: order.id },
                data: { status: "CANCELLED" },
                include: { items: true }
            });

            // 2. Devolver stock de cada producto
            for (const item of updatedOrder.items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { increment: item.quantity } }
                });
            }

            return updatedOrder;
        });

        return new Order(cancelled);
    }

}
