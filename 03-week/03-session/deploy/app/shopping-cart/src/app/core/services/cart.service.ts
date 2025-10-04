import { Injectable } from '@angular/core';
// Se importan las clases necesarias de RxJS para manejar flujos asíncronos.
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Se importan los modelos de datos para carrito de compras y productos.
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root' // El servicio será una instancia única disponible en toda la aplicación.
})
export class CartService {

  // URL base para el carrito de compras, que se construye usando la URL base de la API definida en el entorno.
  private apiUrl = `${environment.apiUrl}/cart`;

  // Se utiliza un BehaviorSubject para almacenar los ítems del carrito localmente y permitir que los componentes suscritos reciban actualizaciones.
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  // Observable público que permite a los componentes suscribirse a los cambios del carrito.
  cart$ = this.cartSubject.asObservable();

  // Se inyecta HttpClient para realizar las peticiones HTTP.
  constructor(private http: HttpClient) {}

  /** Agregar producto al carrito (en el backend) */
  addProduct(product: Product, userId: string, quantity: number = 1): Observable<CartItem> {
    // Se crea el payload que será enviado al servidor con los datos necesarios para agregar un producto al carrito.
    const payload = {
      userId,
      productId: product.id,
      quantity
    };

    // Se realiza una solicitud POST para agregar el producto al carrito en el backend.
    return this.http.post<CartItem>(`${this.apiUrl}`, payload).pipe(
      tap((newItem) => {
        // Después de recibir el nuevo ítem, actualiza el carrito local con el nuevo producto.
        const currentCart = this.cartSubject.value;
        this.cartSubject.next([...currentCart, newItem]);
      })
    );
  }

  /** Obtener carrito del usuario */
  getCartByUser(userId: string): Observable<{ userId: string; items: CartItem[]; total: number }> {
    // Se realiza una solicitud GET para obtener los ítems del carrito de un usuario específico.
    return this.http.get<{ userId: string; items: CartItem[]; total: number }>(`${this.apiUrl}/${userId}`).pipe(
      tap(response => {
        // Actualiza el carrito local con los ítems obtenidos del servidor.
        this.cartSubject.next(response.items);
      })
    );
  }

  /**  Obtener el total del carrito (precio total de todos los productos) */
  getTotal(): number {
    // Se calcula el total sumando el precio de cada producto multiplicado por su cantidad.
    return this.cartSubject.value.reduce(
      (total, item) => total + (item.product?.price || 0) * item.quantity,
      0
    );
  }


  /**  Vaciar carrito */
  clearCart(userId: string): Observable<any> {
    // Se realiza una solicitud DELETE para vaciar el carrito del usuario en el backend.
    return this.http.delete(`${this.apiUrl}/clear/${userId}`).pipe(
      tap(() => this.cartSubject.next([])) // Después de vaciar el carrito en el backend, se actualiza el carrito local.
    );
  }
}
