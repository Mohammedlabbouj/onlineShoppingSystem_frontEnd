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
  product: Product;
  onClick: () => void;
}

export interface ProductsSectionProps {
  products: Product[];
  onClick: () => void;
}
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          err instanceof Error ? err.message : "Failed to load products"
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
  const handleAddToCart = async () => {};

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <ForYou />
          <ProductsSection products={products} onClick={handleAddToCart} />
          <Footer />
        </main>
      </div>
    </>
  );
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [productReview, setProductReview] = useState<ProductReview | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductReview = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/reviews/product/${product.productId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product's review");
        }

        const data = await response.json();
        setProductReview(data);
      } catch (error) {
        console.error("Error fetching review:", error);
        setProductReview(null);
      } finally {
        setIsLoading(false);
      }
    };

    getProductReview();
  }, [product.productId]);

  const renderReviews = () => {
    if (isLoading) {
      return (
        <div className="text-sm text-muted-foreground">Loading reviews...</div>
      );
    }

    if (!productReview) {
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
                  className={`h-4 w-4 ${
                    i < (productReview?.rating || 0)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({productReview.comment || "No one reviewed yet"})
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
          onClick={onClick}
        />
        <AddToCart
          className="bg-green-500"
          value="Add to Cart"
          onClick={onClick}
        />
      </CardFooter>
    </Card>
  );
}

function ProductsSection({ products, onClick }: ProductsSectionProps) {
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
                onClick={onClick}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
