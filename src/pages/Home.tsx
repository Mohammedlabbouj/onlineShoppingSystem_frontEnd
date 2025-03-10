import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export function Product({ product }: { product: Product }) {
  return (
    <div
      key={product.id}
      className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow hover:cursor-pointer"
    >
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-4"
        />
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-xl font-bold">${product.price}</p>
      </Link>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(localStorage.getItem("userEmail"));
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        // Add a 1.5 second delay before setting the products
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
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
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
