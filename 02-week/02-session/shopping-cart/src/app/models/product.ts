export interface Product {
  id: number;          // Identificador único del producto
  name: string;        // Nombre del producto
  price: number;       // Precio del producto
  description?: string; // (opcional) Descripción del producto
  image?: string;       // (opcional) URL de la imagen
}

