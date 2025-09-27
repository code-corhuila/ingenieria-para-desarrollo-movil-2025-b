import { Product } from "./product";

export interface CartItem {
  product: Product;   // Producto que se agregó
  quantity: number;   // Cantidad de ese producto en el carrito
}
