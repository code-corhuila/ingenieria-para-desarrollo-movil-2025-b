import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// Se importan los modelos de datos relacionados con el carrito.
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root' // El servicio será una instancia única disponible en toda la aplicación.
})
export class OrdersService {

  // URL base para las órdenes, que se construye usando la URL base de la API definida en el entorno.
  private apiUrl = `${environment.apiUrl}/orders`;

  // Se utiliza un BehaviorSubject para almacenar los ítems del carrito localmente.
  // Esta propiedad es útil para mantener el estado del carrito y permitir que los componentes suscritos reciban actualizaciones.
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  // Observable público que permite a los componentes suscribirse a los cambios del carrito.
  cart$ = this.cartSubject.asObservable();

  // Se inyecta HttpClient para realizar las peticiones HTTP.
  constructor(private http: HttpClient) {}

  /**  Realizar el checkout (finalizar compra) */
  checkout(userId: string) {
    // Realiza una solicitud POST al backend para procesar el checkout del carrito del usuario.
    return this.http.post<any>(`${this.apiUrl}/checkout/${userId}`, {});
  }

  /**  Obtener las órdenes de un usuario */
  getOrdersByUser(userId: string) {
    // Realiza una solicitud GET para obtener todas las órdenes de un usuario específico.
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}
