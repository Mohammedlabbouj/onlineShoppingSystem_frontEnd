// src/components/ProductCard.tsx
import React from "react";
import { ProductType } from "@/types/product";

interface ProductCardProps {
  product: ProductType;
  onDelete: (id: string | number) => void; // Add functions for real actions
  onEdit: (id: string | number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:space-x-4">
      {/* Image */}
      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0 bg-gray-100 rounded flex items-center justify-center">
        <img
          src={product.image}

          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h3
            className="font-semibold text-gray-800 mb-1 truncate"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-lg font-bold text-gray-900 mb-1">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">Qt: {product.stockQuantity}</p>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 mt-3 sm:mt-0 self-end">
          <button
            onClick={() => onDelete(product.productId)}
            className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 transition duration-150 ease-in-out"
          >
            Delete
          </button>
          <button
            onClick={() => onEdit(product.productId)}
            className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
