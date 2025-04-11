import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/functions/allProducts";
import { ProductType } from "@/types/product";
import LoadingComponent from "@/components/Loading";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-4">
      {loading ? (
        <LoadingComponent />
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 hover:cursor-pointer">
          {products.map((product) => (
            <div
              key={product.productId}
              // Removed aspect-square unless strictly needed, added flex for layout
              className="border rounded-2xl shadow p-4 flex flex-col overflow-hidden"
            >
              <Link to={`/product/${product.productId}`}>
                {/* Image container - controls image size and hover effect */}
                <div className="mb-3 overflow-hidden rounded-md">
                  {" "}
                  {/* Add margin bottom, optional rounding */}
                  <img
                    src={product.image}
                    alt={product.name}
                    // Removed absolute positioning. Set width, height (adjust as needed), and object-fit.
                    // Added duration for smoother transition.
                    className="w-full h-48 object-contain transition-transform duration-300 hover:scale-105"
                    // Consider h-auto if you want height to adjust based on width/content,
                    // but fixed height (like h-48 or h-56) is common for grid consistency.
                  />
                </div>
              </Link>
              {/* Text content container */}
              <div className="flex flex-col">
                {" "}
                {/* Keeps text together */}
                <h1
                  className="text-lg font-semibold truncate"
                  title={product.name}
                >
                  {" "}
                  {/* Added truncate for long names, title for full name on hover */}
                  {product.name}
                </h1>
                <p className="text-blue-600 font-bold mt-1">
                  {" "}
                  {/* Added margin top for spacing */}
                  Price: ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
