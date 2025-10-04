import prisma from "../../config/prisma.js";
import { ICartRepository } from "../../domain/repositories/ICartRepository.js";

export class PrismaCartRepository extends ICartRepository {
  /// <summary>
  /// Agrega producto al carrito de un usuario (crea carrito si no existe).
  /// </summary>
  async addItem(userId, productId, quantity) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw { status: 404, message: "Producto no encontrado" };

    // Buscar o crear carrito
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId, total: 0 } });
    }

    // Buscar item existente
    const existingItem = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
      include: { product: true }
    });

    const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;
    const subtotal = newQuantity * product.price;

    // Crear/actualizar ítem
    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      update: { quantity: newQuantity, subtotal },
      create: { cartId: cart.id, productId, quantity: newQuantity, subtotal }
    });

    // Recalcular total
    await this.#recalculateCartTotal(cart.id);

    return this.findByUserId(userId);
  }

  async updateItem(cartItemId, quantity) {
    const item = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { product: true, cart: true }
    });
    if (!item) throw { status: 404, message: "Item no encontrado" };

    const subtotal = item.product.price * quantity;

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity, subtotal }
    });

    await this.#recalculateCartTotal(item.cartId);

    return this.findByUserId(item.cart.userId);
  }

  async removeItem(cartItemId) {
    debugger
    const item = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true }
    });
    if (!item) throw { status: 404, message: "Item no encontrado" };

    await prisma.cartItem.delete({ where: { id: cartItemId } });

    await this.#recalculateCartTotal(item.cartId);

    return prisma.cart.findUnique({
      where: { id: item.cartId },
      include: { items: { include: { product: true } } }
    });
  }

  async findByUserId(userId) {
    return await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    });
  }

  async clearByUserId(userId) {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) return { success: true, message: "Carrito ya vacío" };

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    await prisma.cart.update({ where: { id: cart.id }, data: { total: 0 } });

    return { success: true, message: "Carrito vacío" };
  }

  // Método privado para recalcular el total
  async #recalculateCartTotal(cartId) {
    const items = await prisma.cartItem.findMany({ where: { cartId } });
    const total = items.reduce((acc, i) => acc + Number(i.subtotal), 0);

    await prisma.cart.update({
      where: { id: cartId },
      data: { total }
    });
  }
}
