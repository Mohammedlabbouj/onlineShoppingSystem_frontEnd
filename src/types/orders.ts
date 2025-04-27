export interface Order {
  orderDTOId: number;
  totalAmount: number;
  status: string;
  customerId: number;
  vendorId: number;
  items: OrderItem[];
}

export interface OrderItem {
  id: number | string;
  name: string;
  orderId: number;
  quantity: number;
  priceAtPurchase: number;
  imageUrl?: string; // Optional image URL
}
