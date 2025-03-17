import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

interface Product {
  productId: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stockQuantity: number;
  categoryId: number;
  vendorId: number;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow hover:cursor-pointer">
      <Link to={`/product/${product.productId}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain mb-4"
        />
        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">Stock: {product.stockQuantity}</p>
        <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
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
            "Accept": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err.message : "Failed to load products");
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
}
