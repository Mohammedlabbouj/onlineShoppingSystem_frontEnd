import { ProductType } from '@/types/product';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductsByVendorId } from '@/functions/getProductsByid';
import ProductCard from '@/components/ProductCard';



export default function ProductsVendor() {
  const [products, setProducts] = useState<ProductType[]>([]);
  let navigate = useNavigate();
  let vendorId = localStorage.getItem("id");
  useEffect(()=>{
    // Fetch products from the API 
    const fetchVendorProducts = async ()=>{
      try {
        const response = await getProductsByVendorId(vendorId as string);
        if (response) {
          setProducts(response);
        } else {
          console.error("No products found");
        }
        
      } catch (error) {
        console.error("Error fetching products:", error);  
      }

    }
    fetchVendorProducts();
  },[vendorId]);

    // --- Event Handlers ---
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
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Manage Products
              </h2>
              <button
                onClick={handleAddNewProduct}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150 ease-in-out shadow-sm"
              >
                Add a new product
              </button>
            </div>
            {/* Show ALL products */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    onDelete={handleDeleteProduct}
                    onEdit={handleEditProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                No products added yet. Click 'Add a new product' to start.
              </div>
            )}
          </section>
        )
}

