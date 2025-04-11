export interface Review {
  reviewId: number;
  rating: number;
  comment: string;
  productId: number;
  customerId: number;
}

export interface ProductType {
  productId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stockQuantity: number;
  vendorId: number;
  categoryId: number;
  specificCategoryId: number;
  reviews: Review[];
}

export interface PurchaseOptionsProp {
  product: {
    productId: number;
    stockQuantity: number;
    price: number;
  };
}

export interface CartType {
  shoppingCartDTOId: number;
  customerId: number;
  cartItems: {
    productId: number;
    cartItemId: number;
    quantity: number;
    shoppingCartId: number;
  }[];
}

export interface ProductInfoProps {
  product: ProductType;
  reviewsProp: Review[];
}

// Add this new interface
export interface AllReviewsPopupProps {
  onClose: () => void;
  reviews: Review[];
}
