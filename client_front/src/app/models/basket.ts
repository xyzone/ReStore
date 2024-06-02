export interface BasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  quantity: number;
  type: string;
  brand: string;
}
export interface Basket {
  id: number;
  buyerId: string;
  items: BasketItem[];
}