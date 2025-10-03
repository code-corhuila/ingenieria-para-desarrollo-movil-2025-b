import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { RouterLink } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink],
})
export class CartPage implements OnInit {
  // Array para almacenar los elementos del carrito.
  cartItems: CartItem[] = [];
   // Variable para almacenar el total calculado del carrito.
  total: number = 0;
   // Variable para almacenar el resumen del pedido después del checkout.
  orderSummary: any = null;
   userId: string = ''; // inicializar vacío
   // Obtiene el ID del usuario desde localStorage.

  constructor(private cartService: CartService, private orders: OrdersService) {}

  async ngOnInit() {
    // Carga el carrito de compras cuando el componente se inicializa.
    // Obtener el ID del usuario desde Preferences
    const userData = await Preferences.get({ key: 'user' });
    if (userData.value) {
      const user = JSON.parse(userData.value);
      this.userId = user.id;
    }

    // Una vez tengas el ID, carga el carrito
    if (this.userId) {
      this.loadCart();
    } else {
      console.error('⚠️ No se encontró el ID del usuario en Preferences');
    }
  }
  /**
   * Método para cargar los elementos del carrito desde el servicio CartService.
   */
  loadCart() {
    this.cartService.getCartByUser(this.userId).subscribe({
      next: (response) => {
        // Asigna los elementos del carrito y el total a las variables correspondientes.
        this.cartItems = [...(response.items || [])];
        this.total = response.total || this.calculateTotal(this.cartItems);
      },
      error: (err) => console.error('Error al cargar el carrito:', err),
    });
  }

  /**
   * Método para calcular el total del carrito sumando el precio de cada producto multiplicado por su cantidad.
   *
   * @param items Elementos del carrito.
   * @returns El total calculado del carrito.
   */
  calculateTotal(items: CartItem[]): number {
     // Suma el precio de cada item multiplicado por su cantidad.
    return items.reduce((sum, item) => {
      const price = item.product?.price ?? 0;
      return sum + price * item.quantity;
    }, 0);
  }
   /**
   * Método para proceder al checkout y confirmar el pedido.
   */

  checkout() {
        // Verifica si el ID del usuario está disponible.
    if (!this.userId) {
      console.error('⚠️ No se encontró el ID del usuario');
      return;
    }

     // Llama al servicio OrdersService para realizar el checkout.
    this.orders.checkout(this.userId).subscribe({
      next: (response) => {
         // Si el checkout es exitoso, se muestra el resumen del pedido.

         // Almacena el resumen del pedido en la variable orderSummary para mostrarlo en la vista.
        this.orderSummary = response;

        // Limpia el carrito después del checkout.
        this.cartItems = [];
        this.total = 0;
      },
      error: (err) => {
        console.error('❌ Error en el checkout:', err);
      }
    });
  }
}
