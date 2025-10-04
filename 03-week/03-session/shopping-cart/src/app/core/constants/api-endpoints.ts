// Define la URL base de la API usando la variable apiUrl del entorno.

import { environment } from "src/environments/environment.prod";

// Esto permite usar diferentes URLs para distintos entornos (producción, desarrollo, etc.).
const BASE_URL = environment.apiUrl;

// Se exportan los puntos finales (endpoints) de la API relacionados con la autenticación.
// Esta estructura permite mantener la URL base centralizada y hace que el código sea más fácil de mantener y escalar.
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`,
    PROFILE: `${BASE_URL}/auth/profile`,
  },

};
