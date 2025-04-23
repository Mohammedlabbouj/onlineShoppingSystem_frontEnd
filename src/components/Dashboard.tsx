import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import ProductCard from "./ProductCard";
import {
  IoCartOutline,
  IoCubeOutline,
  IoPricetagsOutline,
  IoSwapHorizontalOutline,
} from "react-icons/io5";
import { Stat } from "@/types/vendor";
import { ProductType } from "@/types/product";
import { getProductsByVendorId } from "@/functions/getProductsByid";

export default function Dashboard() {
  const [products, setProducts] = useState<ProductType[]>([]);
  let navigate = useNavigate();
  const stats: Stat[] = [
    { title: "Total orders", value: 120, icon: IoCartOutline },
    { title: "Pending Shipping", value: 10, icon: IoSwapHorizontalOutline },
    { title: "Top Sales", value: 5, icon: IoPricetagsOutline },
    { title: "Out of Stock", value: 5, icon: IoCubeOutline },
  ];
  let vendorId = localStorage.getItem("id");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByVendorId(vendorId as string);
        if (data) {
          setProducts(data);
        } else {
          console.error("No products found");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = (id: string | number) => {
    console.log("Delete product:", id);
    // TODO: Call API, update state, etc.
    // Example: setProducts(products.filter(p => p.id !== id));
  };

  const handleEditProduct = (id: string | number) => {
    console.log("Edit product:", id);
    // TODO: Navigate to edit page or open modal
    navigate(`/editProduct/${id}`); // Example navigation
  };

  const handleAddNewProduct = () => {
    console.log("Add new product clicked");
    navigate("/addProduct");
  };
  return (
    <>
      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </section>

      {/* Recently Added Products Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Recently added product
          </h2>
          <button
            onClick={handleAddNewProduct}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150 ease-in-out shadow-sm"
          >
            Add a new product
          </button>
        </div>
        {/* Show maybe first 4 products on dashboard */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {products
              .slice(products.length - 4, products.length)
              .reverse()
              .map(
                (
                  product, // Display only first 4
                ) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    onDelete={handleDeleteProduct}
                    onEdit={handleEditProduct}
                  />
                ),
              )}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No products added yet.
          </div>
        )}
      </section>
    </>
  );
}
