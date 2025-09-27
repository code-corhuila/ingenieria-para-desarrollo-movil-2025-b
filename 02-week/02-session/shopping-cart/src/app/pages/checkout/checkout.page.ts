import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,FormsModule]
})
export class CheckoutPage implements OnInit {

  /** Lista de productos en el carrito */
  cartItems: CartItem[] = [];

  /** Total acumulado del carrito */
  total: number = 0;

  constructor(private cartService: CartService, private alertController: AlertController) {}

  /**
   * Al iniciar la página, nos suscribimos al observable cart$.
   * Así recibimos en tiempo real los productos del carrito y el total.
   */
  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  /**
   * Simula la finalización de la compra.
   * - Muestra un mensaje de confirmación.
   * - Vacía el carrito usando clearCart().
   */
   async finishPurchase() {
    const alert = await this.alertController.create({
      header: '✅ Compra completada',
      message: 'Tu compra ha sido finalizada con éxito 🎉',
      buttons: ['OK'],
    });

    await alert.present();

    this.cartService.clearCart();
  }
}
