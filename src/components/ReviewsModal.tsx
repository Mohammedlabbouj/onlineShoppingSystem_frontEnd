// src/components/ReviewsModal.tsx
import React from "react";
import { Review } from "../types/product"; // Adjust path if needed
import { ReviewList } from "./ReviewsList";

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
  productName: string;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  reviews,
  productName,
}) => {
  if (!isOpen) return null;

  // Function to render stars
  const renderStars = (rating: number) => {
    return (
      <span className="text-yellow-500 inline-block ml-2">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </span>
    );
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4"
      onClick={onClose} // Close when clicking backdrop
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Reviews for {productName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Reviews List - Scrollable */}
        <div className="overflow-y-auto flex-grow pr-2">
          {" "}
          {/* Added pr-2 for scrollbar space */}
          {reviews.length > 0 ? (
            <ul className="space-y-4">
              {reviews.map((review, index) => (
                <li key={index} className="border-b last:border-b-0 pb-3">
                  <ReviewList review={review} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No reviews yet for this product.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
