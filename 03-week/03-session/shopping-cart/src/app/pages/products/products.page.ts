import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/core/services/cart.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProductsPage implements OnInit {
  // Array para almacenar los productos obtenidos del backend.
  products: Product[] = [];
  // Variables de control para mostrar el estado de carga y errores.
  loading = true;
  errorMessage = '';
  // Constructor para inyectar los servicios ProductService y CartService.
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Se carga la lista de productos cuando el componente se inicializa.
    this.loadProducts();
  }

  /**
   * Método para cargar todos los productos utilizando el servicio ProductService.
   * Los productos se mapean para asegurar que el precio esté en formato numérico.
   */
  loadProducts() {
    // Se llama al servicio ProductService para obtener todos los productos.
    this.productService.getAll().subscribe({
      next: (data) => {
        // Si la carga es exitosa, se mapean los productos y se aseguran de que el precio sea un número.
        this.products = data.map((p) => ({
          ...p,
          priceCents: +p.price, // Si el precio viene como string, lo convierte a número.
        }));
        this.loading = false; // Se desactiva el indicador de carga.
      },
      error: (err) => {
        // Si ocurre un error, se muestra un mensaje de error y se desactiva el indicador de carga.
        this.errorMessage = 'No se pudieron cargar los productos.';
        this.loading = false;
      },
    });
  }

  /**
   * Método para agregar un producto al carrito.
   * Verifica si el usuario está autenticado antes de agregar el producto.
   */

  async addToCart(product: Product) {
    // Se obtiene el usuario del localStorage.
    const { value } = await Preferences.get({ key: 'userId' });
    // Si el usuario no está autenticado, se muestra un mensaje de alerta.
    if (!value) {
      alert('⚠️ Debes iniciar sesión antes de agregar productos al carrito.');
      return;
    }
    // Si el usuario está autenticado, se llama al servicio CartService para agregar el producto al carrito.
    this.cartService.addProduct(product, value, 1).subscribe({
      next: (res: CartItem) => {
        // Si el producto se agrega con éxito al carrito, se muestra un mensaje en la consola y una alerta.
        alert(`🛍️ ${product.name} agregado al carrito`);
      },
      error: (err: unknown) => {
        // Si ocurre un error al agregar el producto, se muestra un mensaje de error en la consola y una alerta.
        alert('Error al agregar el producto al carrito');
      },
    });
  }
}
