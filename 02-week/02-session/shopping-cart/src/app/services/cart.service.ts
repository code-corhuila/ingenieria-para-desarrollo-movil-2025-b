// Importamos los decoradores y utilidades de Angular y RxJS
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Importamos nuestros modelos (planos de datos)

import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

/**
 * Servicio encargado de manejar la lógica del Carrito de Compras.
 *
 * Se define como un "singleton" con @Injectable({ providedIn: 'root' }),
 * lo que significa que solo existirá UNA instancia del carrito en toda la app,
 * compartida entre todas las páginas y componentes.
 */

@Injectable({ providedIn: 'root' })
export class CartService {

    /**
   * Arreglo privado donde guardamos los productos del carrito.
   * Cada elemento es un CartItem (producto + cantidad).
   */

  private cart: CartItem[] = [];

  /**
   * BehaviorSubject es un tipo especial de Observable de RxJS
   * que mantiene un valor actual y emite cambios en tiempo real.
   *
   * En este caso, mantiene la lista de items en el carrito.
   */

  private cartSubject = new BehaviorSubject<CartItem[]>([]);

   /**
   * Observable público que expone el estado del carrito.
   *
   * Las páginas pueden suscribirse a "cart$" para recibir
   * los cambios automáticamente cada vez que el carrito se actualice.
   */

  cart$ = this.cartSubject.asObservable();

   /**
   * Método para agregar un producto al carrito.
   *
   * @param product Producto que se quiere agregar.
   * @param quantity Cantidad del producto (por defecto 1).
   */

  addProduct(product: Product, quantity: number = 1): void {
    // Verificamos si el producto ya está en el carrito
    const item = this.cart.find(ci => ci.product.id === product.id);
    if (item) {
      // Si ya existe, aumentamos la cantidad
      item.quantity += quantity;
    } else {
      // Si no existe, lo agregamos como nuevo ítem
      this.cart.push({ product, quantity });
    }
    // Emitimos el nuevo estado del carrito a todos los suscriptores
    this.cartSubject.next(this.cart);
  }

  /**
   * Método para eliminar un producto del carrito por su ID.
   *
   * @param productId ID del producto que se quiere eliminar.
   */

  removeProduct(productId: number): void {
    // Filtramos la lista para excluir el producto que queremos eliminar
    this.cart = this.cart.filter(ci => ci.product.id !== productId);

    // Emitimos el nuevo estado del carrito
    this.cartSubject.next(this.cart);
  }

  /**
   * Método para vaciar todo el carrito.
   */
  clearCart(): void {
    // Dejamos el arreglo vacío
    this.cart = [];
    // Notificamos a todos los observadores que el carrito está vacío
    this.cartSubject.next(this.cart);
  }

  /**
   * Método para calcular el total a pagar del carrito.
   *
   * Multiplica el precio de cada producto por su cantidad,
   * y suma todos los valores.
   *
   * @returns número con el total acumulado.
   */
  getTotal(): number {
    return this.cart.reduce((sum, ci) => sum + ci.product.price * ci.quantity, 0);
  }
}
