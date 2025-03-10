import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
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

    getProduct();
  }, [id]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-3xl font-bold">${product.price}</p>
          <div>
            <button className="mt-4 bg-black border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black hover:border-black transition-colors">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
