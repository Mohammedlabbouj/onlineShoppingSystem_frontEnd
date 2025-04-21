// src/components/ProductReviewSummaryCard.tsx
import React from "react";
import { ProductType, Review } from "../types/product"; // Adjust path
import RatingBreakdown from "@/components/RatingBreakdown"; // Adjust path

interface ProductReviewSummaryCardProps {
  product: ProductType;
  onSeeReviewsClick: (reviews: Review[], productName: string) => void; // Callback to open modal
}

const ProductReviewSummaryCard: React.FC<ProductReviewSummaryCardProps> = ({
  product,
  onSeeReviewsClick,
}) => {
  const handleButtonClick = () => {
    onSeeReviewsClick(product.reviews, product.name);
  };

  console.log("ProductReviewSummaryCard", product.image);

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
      {/* Image */}

      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0 bg-gray-100 rounded flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product Name & Rating Breakdown */}
      <div className="flex-grow">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          {product.name}
        </h3>
        <RatingBreakdown reviews={product.reviews} />
      </div>

      {/* See Reviews Button */}
      <div className="w-full sm:w-auto flex-shrink-0">
        <button
          onClick={handleButtonClick}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150 ease-in-out shadow-sm disabled:bg-gray-400"
          disabled={product.reviews.length === 0} // Disable if no reviews
        >
          See all reviews ({product.reviews.length})
        </button>
      </div>
    </div>
  );
};

export default ProductReviewSummaryCard;
