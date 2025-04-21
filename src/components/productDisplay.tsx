import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { handleAddToCart } from "@/functions/CartFunctions";
import { ProductType } from "@/types/product";

import AddToCart from "@/components/Button";
import BuyProduct from "@/components/Button";

export interface ProductCardProps {
  product: ProductType;
  cartId?: number | null;
}

export default function ProductDisplay({ product, cartId }: ProductCardProps) {
  // Replace the loose id variable with state

  function calculateAvrgReview() {
    let sum = 0;
    for (let i = 0; i < product.reviews.length; i++) {
      sum += product.reviews[i].rating;
    }
    return sum / product.reviews.length;
  }

  const renderReviews = () => {
    if (product.reviews.length === 0) {
      return (
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-muted text-muted" />
              ))}
          </div>
          <span className="text-sm text-muted-foreground">No reviews yet</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < (calculateAvrgReview() || 0) // Use first review rating or 0
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews.length || "No one reviewed yet"})
          </span>
        </div>
      );
    }
  };

  return (
    <Card key={product.productId} className="overflow-hidden">
      <div className="aspect-square relative hover:cursor-pointer ">
        <Link to={`/product/${product.productId}`} className="block">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain transition-transform hover:scale-105"
          />
        </Link>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">{renderReviews()}</div>
        <h3 className="font-medium line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-4 ">
        <BuyProduct
          className="bg-yellow-400"
          value="Buy Now"
          onClick={() => {
            //later
          }}
        />
        <AddToCart
          className="bg-green-500"
          value="Add to Cart"
          onClick={() => {
            if (cartId) {
              // Add check to ensure cartId exists
              handleAddToCart({
                shoppingCartId: cartId,
                productId: product.productId,
                quantity: 1,
              });
            } else {
              console.error("Cart ID not yet available");
            }
          }}
        />
      </CardFooter>
    </Card>
  );
}
