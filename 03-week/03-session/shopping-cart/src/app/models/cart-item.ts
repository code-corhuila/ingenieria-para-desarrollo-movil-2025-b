
export interface CartItem {
  id?: string;
  userId: string;
  productId: string;
  quantity: number;

  product?: {
    id: string;
    name: string;
    price: number;
    description?: string;
    sku?: string;
  };
}
