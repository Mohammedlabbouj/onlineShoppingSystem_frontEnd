import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AddToCart from "../components/Button";
import BuyProduct from "../components/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import ForYou from "@/components/Foryou";

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
            ({productReview.comment || "No comment"})
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

function Hero() {
  return (
    <section className="relative">
      <div className="container px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Shop the Latest Trends{" "}
              <span className="text-primary">Online</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              Discover amazing products at unbeatable prices. Free shipping on
              orders over $50.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" asChild>
                <a href="/products">Shop Now</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/deals">View Deals</a>
              </Button>
            </div>
          </div>
          <div className="relative h-72 sm:h-80 lg:h-96">
            <img
              src="https://placehold.co/800x600"
              alt="Featured products"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    image: "https://placehold.co/200x200",
  },
  { name: "Clothing", slug: "clothing", image: "https://placehold.co/200x200" },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: "https://placehold.co/200x200",
  },
  { name: "Beauty", slug: "beauty", image: "https://placehold.co/200x200" },
  { name: "Sports", slug: "sports", image: "https://placehold.co/200x200" },
  { name: "Toys", slug: "toys", image: "https://placehold.co/200x200" },
];

function CategoriesSection() {
  return (
    <section className="bg-muted py-12">
      <div className="container px-4 sm:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Shop by Category
          </h2>
          <Button variant="ghost" className="gap-1" asChild>
            <a href="/categories">
              View All <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <a
              key={category.name}
              href={`/category/${category.slug}`}
              className="group"
            >
              <div className="aspect-square relative rounded-lg overflow-hidden bg-background">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="mt-2 text-center font-medium">{category.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProductsSectionProp {
  onClick: (value: void) => void;
  products?: Product[];
  product_reviews?: ProductReview[];
}

function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/products"
                  className="text-muted-foreground hover:text-foreground"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/deals"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Deals
                </a>
              </li>
              <li>
                <a
                  href="/new"
                  className="text-muted-foreground hover:text-foreground"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="/bestsellers"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Bestsellers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="/warranty"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Warranty
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/press"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} ShopMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
