import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NewProduct {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  image: string;
  categoryId: number;
  vendorId: number;
}

export default function AddProduct() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    image: "",
    categoryId: 0, // Assuming 1 is for bags/backpacks
    vendorId: 0, // Assuming 1 is the default vendor
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:9090/api/products/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      const data = await response.json();
      console.log("Product created successfully:", data);
      navigate("/");
    } catch (err) {
      console.error("Add product error:", err);
      setError(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-20 p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md h-32"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              min="0"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Product preview"
              className="mt-2 h-32 object-contain"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Category ID
            </label>
            <input
              type="number"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Vendor ID</label>
            <input
              type="number"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            onClick={() => navigate("/vendor")}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Add Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/vendor")}
            className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
