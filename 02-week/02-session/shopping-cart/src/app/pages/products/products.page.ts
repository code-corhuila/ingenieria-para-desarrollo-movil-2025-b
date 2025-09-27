import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product'; // Modelo del producto
import { CartService } from 'src/app/services/cart.service'; // Servicio del carrito
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true, // Standalone component (Angular 15+)
  imports: [IonicModule,CommonModule,FormsModule],
})
export class ProductsPage implements OnInit {

  /**
   * Lista de productos que se mostrarán en pantalla.
   * Aquí está mockeada (quemada en código),
   * pero en un proyecto real vendrían de un servicio o API.
   */
  products: Product[] = [
    { id: 1, name: 'Camisa', price: 50, image: 'assets/images/shirt.png' },
    { id: 2, name: 'Pantalón', price: 80, image: 'assets/images/pants.png' },
  ];

  // Inyectamos el servicio del carrito
  constructor(private cartService: CartService) {}

  ngOnInit() {}

  /**
   * Agrega el producto seleccionado al carrito.
   *
   * @param product Producto seleccionado
   */
  addToCart(product: Product) {
    this.cartService.addProduct(product); // Usamos el servicio
  }

}
