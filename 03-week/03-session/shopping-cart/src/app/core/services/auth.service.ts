
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Se importa el ApiService que es el servicio encargado de realizar las peticiones HTTP en la aplicación.
import { ApiService } from './api.service';

// Se importan los endpoints relacionados con la autenticación desde el archivo de constantes.
import { API_ENDPOINTS } from '../constants/api-endpoints';

// Se importa la interfaz 'register', la cual es utilizada para definir la estructura de los datos
// que se enviarán al endpoint de registro (registro de usuario).
import { register } from '../../models/register';

// Se marca la clase AuthService como un servicio de Angular, utilizando el decorador @Injectable.
// Esto permite que el servicio sea inyectado en otros componentes o servicios de la aplicación.
@Injectable({
  providedIn: 'root' // El servicio estará disponible de manera global en toda la aplicación.
})
export class AuthService {

  // Se inyecta el servicio ApiService para poder realizar las peticiones HTTP.
  constructor(private api: ApiService) {}

  /**
   * Realiza una solicitud POST para registrar a un nuevo usuario.
   *
   * @param userData Objeto que contiene los datos del nuevo usuario para el registro (de acuerdo a la interfaz 'register').
   * @returns Observable<any> Un flujo de datos que contiene la respuesta del servidor a la solicitud.
   */
  register(userData: register): Observable<any> {
    // Llama al servicio 'post' de ApiService, enviando los datos de usuario al endpoint de registro.
    return this.api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  /**
   * Realiza una solicitud POST para autenticar a un usuario con las credenciales proporcionadas.
   *
   * @param credentials Objeto que contiene el email y la contraseña del usuario para el login.
   * @returns Observable<any> Un flujo de datos que contiene la respuesta del servidor a la solicitud de login.
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    // Llama al servicio 'post' de ApiService, enviando las credenciales al endpoint de login.
    return this.api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }
}
