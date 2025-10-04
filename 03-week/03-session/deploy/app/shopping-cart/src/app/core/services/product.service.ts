import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Se importa el modelo Product, que define la estructura de los datos de un producto.
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root' // El servicio será una instancia única disponible en toda la aplicación.
})
export class ProductService {

  // URL base para los productos, que se construye usando la URL base de la API definida en el entorno.
  private apiUrl = `${environment.apiUrl}/products`;

  // Se inyecta HttpClient para realizar las peticiones HTTP.
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los productos del backend
   *
   * @returns Observable<Product[]> Un flujo de productos que serán devueltos desde el backend.
   */
  getAll(): Observable<Product[]> {
    // Realiza una solicitud GET al backend para obtener todos los productos.
    return this.http.get<Product[]>(this.apiUrl);
  }

  /**
   * Obtiene un producto específico por ID
   *
   * @param id El ID del producto que se desea obtener.
   * @returns Observable<Product> Un flujo que contiene los datos del producto con el ID proporcionado.
   */
  getById(id: string): Observable<Product> {
    // Realiza una solicitud GET al backend para obtener el producto con el ID especificado.
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
