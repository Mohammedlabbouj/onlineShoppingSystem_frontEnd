import Loading from "../components/Loading";
import AddToCart from "../components/Button";
import BuyProduct from "../components/Button";
import ForYou from "@/components/Foryou";
import Footer from "@/components/Footer";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import { ProductType } from "@/types/product";
import { getCartId, handleAddToCart } from "@/functions/CartFunctions";
export interface Product {
  productId: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stockQuantity: number;
  categoryId: number;
  vendorId: number;
}

export interface ProductReview {
  review_id: number;
  comment: string;
  rating: number;
  customer_id: number;
  product_id: number;
}

export interface ProductCardProps {
  product: ProductType;
  cartId?: number | null;
}

export interface ProductsSectionProps {
  products: ProductType[];
}
export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(localStorage.getItem("userType"));

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:9090/api/products/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load products",
        );
      } finally {
        setIsLoading(false);
      }
    };

    getAllProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Error Loading Products</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <ForYou />
          <ProductsSection products={products} />
          <Footer />
        </main>
      </div>
    </>
  );
}

export function ProductCard({ product, cartId }: ProductCardProps) {
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

function ProductsSection({ products }: ProductsSectionProps) {
  const [cartId, setCartId] = useState<number | null>(null);

  useEffect(() => {
    const getId = async () => {
      try {
        const fetchedId = await getCartId();
        setCartId(fetchedId);
        console.log("Cart ID:", fetchedId);
      } catch (error) {
        console.error("Error fetching cart ID:", error);
      }
    };

    getId();
  }, []);
  return (
    <>
      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Products
            </h2>
            <Button variant="ghost" className="gap-1" asChild>
              <a href="/products">
                View All <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                cartId={cartId}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
