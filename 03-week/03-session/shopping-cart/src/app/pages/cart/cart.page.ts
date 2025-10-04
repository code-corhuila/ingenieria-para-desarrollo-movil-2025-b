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
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class CartPage implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  orderSummary: any = null;
  userId: string = '';

  constructor(
    private cartService: CartService,
    private orders: OrdersService
  ) {}

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'userId' });
    console.log('🔑 userId desde Preferences:', value);

    if (value) {
      this.userId = value;
      this.loadCart();
    } else {
      console.error('⚠️ No se encontró el ID del usuario en Preferences');
    }
  }

  loadCart() {
    console.log('➡️ Llamando a getCartByUser con:', this.userId);

    this.cartService.getCartByUser(this.userId).subscribe({
      next: (response) => {
        this.cartItems = [...(response.items || [])];
        this.total = response.total || this.calculateTotal(this.cartItems);
      },
      error: (err) => {
        console.error('❌ Error al cargar el carrito:', err);
      },
    });
  }

  calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => {
      const price = item.product?.price ?? 0;
      return sum + price * item.quantity;
    }, 0);
  }

  checkout() {
    if (!this.userId) {
      console.error('⚠️ No se encontró el ID del usuario');
      return;
    }

    this.orders.checkout(this.userId).subscribe({
      next: (response) => {
        this.orderSummary = response;
        this.cartItems = [];
        this.total = 0;
      },
      error: (err) => {
        console.error('❌ Error en el checkout:', err);
      },
    });
  }
}
