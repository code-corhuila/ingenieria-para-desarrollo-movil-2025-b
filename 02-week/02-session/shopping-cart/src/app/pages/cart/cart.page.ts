import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';   // Modelo del item de carrito
import { CartService } from 'src/app/services/cart.service'; // Servicio centralizado
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,  // Componente standalone (Angular 15+)
  imports: [IonicModule,CommonModule,FormsModule]
})
export class CartPage implements OnInit {

  /** Lista de productos en el carrito */
  cartItems: CartItem[] = [];

  /** Total acumulado del carrito */
  total: number = 0;

  // Inyectamos el CartService para acceder a la lógica del carrito
  constructor(private cartService: CartService) {}

  /**
   * Cuando inicia la página, nos suscribimos al observable cart$.
   * Cada vez que cambia el carrito (producto agregado/eliminado),
   * actualizamos la lista y el total automáticamente.
   */
  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }
}
