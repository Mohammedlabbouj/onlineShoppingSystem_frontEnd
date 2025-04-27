import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductType } from "@/types/product";
import { getProductFunction } from "@/functions/getProduct"; 

const updateProduct = async (productData: ProductType): Promise<boolean> => {
  try {
    const response = await fetch(
      `http://localhost:9090/api/products/${productData.productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      },
    );
    //if (!response.ok) {
    //  const errMessage = await response.text(); // or response.json() if it's JSON
    //  throw new Error(`Failed to update product: ${errMessage}`);
    //}

    const data = await response.json();
    console.log("Product updated successfully:", data);
    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    return false;
  }
};


function EditProductPage() {
  const { id } = useParams<{ id: string }>(); // Get productId from route params
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setError("Product ID is missing.");
      setIsLoading(false);
      return;
    }

    const loadProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProductFunction(id as string);
        if (data) {
          setProductData(data);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!productData) return;
    const { name, value, type } = e.target;

    setProductData({
      ...productData,
      [name]: type === "number" ? parseFloat(value) || 0 : value, // Handle number conversion
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productData || isSaving) return;

    setIsSaving(true);
    setError(null); // Clear previous errors

    try {
      const success = await updateProduct(productData);
      if (success) {
        alert("Product updated successfully!");
        navigate("/"); // Or back to the product list in the dashboard
      } else {
        setError("Failed to save product. Please try again.");
      }
    } catch (err) {
      console.error("Failed to save product:", err);
      setError("An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
    // Or navigate('/vendor/products'); // Go to a specific page
  };

  // --- Render Logic ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  if (!productData) {
    // This case might be redundant if error handles 'not found', but good for safety
    return (
      <div className="flex justify-center items-center h-screen">
        Product data could not be loaded.
      </div>
    );
  }

  // --- Main Form ---
  return (
    // Use padding and max-width similar to your reference, adjust as needed
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Edit Product: {productData.name}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-lg shadow-md"
      >
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}

        {/* Mimic two-column layout on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column: Image */}
          <div className="lg:col-span-1">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Image
            </label>
            {productData.image ? (
              <img
                src={productData.image}
                alt={productData.name}
                className="w-full h-auto object-cover rounded-lg border border-gray-200 mb-2 aspect-square" // Added aspect-square
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-2 aspect-square">
                No Image
              </div>
            )}
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={productData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the full URL of the product image.
            </p>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01" // Allow cents
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity (In Stock)
                </label>
                <input
                  // ... other attributes
                  id="stockQuantity"
                  name="stockQuantity" // <-- FIX: Changed to match state property
                  value={productData.stockQuantity ?? ""} // Use ?? '' to handle potential null/undefined
                  onChange={handleChange}
                  required
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductPage;
