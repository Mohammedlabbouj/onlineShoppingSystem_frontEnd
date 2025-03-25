import { useEffect, useState } from "react";
import { Star, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
// import xboxControllerImage from "../assets/xbox-controller.png";

interface Review {
  reviewId: number;
  rating: number;
  Comment: string;
}

export interface ProductType {
  productId: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:9090/api/products/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    const getProductReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:9090/api/reviews/product/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product Reviews");
        }
        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setProductReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    getProductReviews();

    getProduct();
  }, [id]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-8">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Section - Product Image */}
            <ProductImage
              product={{
                image: product.image,
                name: product.name,
              }}
            ></ProductImage>

            {/* Middle Section - Product Info */}

            <ProductInfo
              product={{
                name: product.name,
                price: product.price,
                description: product.description,
              }}
              reviews={productReviews}
            />

            {/* Right Section - Purchase Options */}
            <PurchaseOptions
              product={{
                price: product.price,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

interface PurchaseOptionsProp {
  product: {
    stockQuantity?: string;
    price: number;
  };
}

function PurchaseOptions({ product }: PurchaseOptionsProp) {
  const [quantity, setQuantity] = useState(1);
  let inStock = true;
  return (
    <Card className="p-6">
      <div className="text-xl font-bold mb-4">{product.price}$</div>

      <div className="mb-2 text-green-600 font-medium">
        {inStock ? "In Stock" : "Out of Stock"}
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <span className="mr-2">Quantity:</span>
          <div className="relative">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="pl-3 pr-8 py-2 border rounded-md appearance-none bg-background w-24"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          Add to cart
        </Button>
        <Button className="w-full bg-amber-500 hover:bg-amber-600">
          Buy now
        </Button>
      </div>
    </Card>
  );
}

interface ProductInfoProps {
  product: {
    name: string;
    price: number;
    description: string;
  };
  reviews: Review[];
}

function ProductInfo({ product, reviews }: ProductInfoProps) {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

      <div className="flex items-center mb-4">
        <span className="font-semibold mr-2">price:</span>
        <span className="text-lg">{product.price}$</span>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-1">About this item</h2>
        <p className="text-muted-foreground">{product.description}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-1 mb-1">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < (reviews[0]?.rating || 0) // Use first review rating or 0
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {reviews.length} Rating
          </span>
        </div>
        <button className="text-sm text-primary hover:underline">
          ask a review
        </button>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Reviews ({reviews.length})</h2>
          <button className="text-sm text-primary hover:underline">
            See all
          </button>
        </div>

        {reviews.map((review) => (
          <div key={review.reviewId} className="border rounded-md p-3 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-muted rounded-full p-1">
                <User className="h-4 w-4" />
              </div>
              {/* <span className="font-medium">{review.username}</span> */}
            </div>
            <p className="text-sm mb-1">{review.Comment}</p>
            <div className="flex">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

interface ProductImageProp {
  product: {
    image: string;
    name: string;
  };
}
function ProductImage({ product }: ProductImageProp) {
  return (
    <>
      <Card className="p-6 flex items-center justify-center">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="max-w-full max-h-[400px] object-contain"
        />
      </Card>
    </>
  );
}
