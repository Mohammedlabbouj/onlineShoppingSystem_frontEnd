import { useEffect, useState } from "react";
import { getAllProducts } from "@/functions/allProducts";
import { ProductType } from "@/types/product";
import LoadingComponent from "@/components/Loading";
import ProductCard from "@/components/productDisplay";
import { getCartId } from "@/functions/CartFunctions";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts();
        if (response) {
          setProducts(response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="p-4">
      {loading ? (
        <LoadingComponent />
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              cartId={cartId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
