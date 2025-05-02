// src/types/vendor.ts
export interface Product {
  id: string | number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface Stat {
  link : string;
  title: string;
  value: string | number;
  icon: React.ElementType; // Allows passing icon components
}

export interface StoreInfo {
  name: string;
  pictureUrl?: string; // Optional picture
}

export interface Vendor {
  name: string;
}
