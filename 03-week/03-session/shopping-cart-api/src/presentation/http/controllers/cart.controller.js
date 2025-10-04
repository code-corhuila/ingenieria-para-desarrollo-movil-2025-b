import { PrismaCartRepository } from "../../../infrastructure/repositories/PrismaCartRepository.js";
import { AddToCart } from "../../../application/cart/AddToCart.js";
import { UpdateCartItem } from "../../../application/cart/UpdateCartItem.js";
import { RemoveFromCart } from "../../../application/cart/RemoveFromCart.js";
import { GetCartByUser } from "../../../application/cart/GetCartByUser.js";
import { AddToCartRequestDto } from "../../../domain/dtos/AddToCartRequestDto.js";

export class CartController {
    /// <summary>
    /// Agregar producto al carrito.
    /// </summary>
    static async add(req, res) {
        try {
            const dto = new AddToCartRequestDto(req.body);
            const repo = new PrismaCartRepository();
            const useCase = new AddToCart(repo);

            const result = await useCase.execute(dto);
            res.status(201).json(result);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    /// <summary>
    /// Actualizar cantidad de un ítem en el carrito.
    /// </summary>
    static async update(req, res) {
        try {
            const { cartItemId, quantity } = req.body;
            const repo = new PrismaCartRepository();
            const useCase = new UpdateCartItem(repo);

            const result = await useCase.execute(cartItemId, quantity);
            res.json(result);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    /// <summary>
    /// Eliminar un ítem del carrito.
    /// </summary>
    static async removeItem(req, res) {
        try {
            const { cartItemId } = req.params;
            if (!cartItemId) {
                return res.status(400).json({ message: "El cartItemId es requerido" });
            }

            const repo = new PrismaCartRepository();
            const useCase = new RemoveFromCart(repo);

            const result = await useCase.execute(cartItemId);
            res.json(result);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    /// <summary>
    /// Vaciar carrito completo de un usuario.
    /// </summary>
    static async clear(req, res) {
        try {
            const { userId } = req.params;
            const repo = new PrismaCartRepository();
            await repo.clearByUserId(userId);
            res.json({ success: true, message: "Carrito vacío" });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }


    /// <summary>
    /// Obtener carrito de un usuario.
    /// </summary>
    static async getByUser(req, res) {
        try {
            const { userId } = req.params;
            const repo = new PrismaCartRepository();
            const useCase = new GetCartByUser(repo);

            const result = await useCase.execute(userId);
            res.json(result);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}
