import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { ProductType, Review } from "@/types/product";
import { getProductFunction } from "@/functions/getProduct";
import { ProductImage } from "@/components/ProductImage";
import { PurchaseOptions } from "@/components/PurchaseOptions";
import { ReviewList } from "@/components/ReviewsList";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductFunction(id as string);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message + " fromProduct"
            : "An error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (isLoading) return <Loading />;
  if (error) return <div>error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex min-h-screen flex-col ">
      <main className="flex-1 py-8">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Section - Product Image */}
            <ProductImage
              product={{
                image: product.image,
                name: product.name,
              }}
            />

            {/* Middle Section - Product Info */}
            <ProductInfo product={product} reviewsProp={product.reviews} />

            {/* Right Section - Purchase Options */}
            <PurchaseOptions
              product={{
                productId: product.productId,
                stockQuantity: product.stockQuantity,
                price: product.price,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Add this new interface
interface AllReviewsPopupProps {
  onClose: () => void;
  reviews: Review[];
}

// Add this new component for all reviews popup
function AllReviewsPopup({ onClose, reviews }: AllReviewsPopupProps) {
  // Add rating statistics calculation
  const ratingStats = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  // Calculate max value for bar scaling
  const maxCount = Math.max(...Object.values(ratingStats));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] max-w-[90%] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Reviews ({reviews.length})</h2>
          <Button variant="outline" onClick={onClose}>
            ×
          </Button>
        </div>

        {/* Add Rating Statistics */}
        <div className="mb-6 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <div className="flex items-center gap-1 w-20">
                <span className="text-sm">{rating}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{
                    width: `${(ratingStats[rating] / maxCount) * 100}%`,
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </div>
              <span className="text-sm w-12 text-right">
                {ratingStats[rating]}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewList key={review.reviewId} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProductInfoProps {
  product: ProductType;
  reviewsProp: Review[];
}
// Modify the ProductInfo component
function ProductInfo({ product, reviewsProp }: ProductInfoProps) {
  const [popUp, setPopUp] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(reviewsProp);

  // Function to get the best review
  const getBestReview = () => {
    if (reviews.length === 0) return null;
    // Filter reviews with highest rating
    const maxRating = Math.max(...reviews.map((review) => review.rating));
    const bestReviews = reviews.filter((review) => review.rating === maxRating);
    // Return a random review from the best ones
    return bestReviews[Math.floor(Math.random() * bestReviews.length)];
  };

  function calculateAvrgReview() {
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
      sum += reviews[i].rating;
    }
    return sum / reviews.length;
  }
  const bestReview = getBestReview();

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

      <div className="flex items-center mb-4">
        <span className="font-semibold mr-2">price:</span>
        <span className="text-lg">{product.price}$</span>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-1">About this item</h2>
        <p className="text-muted-foreground">{product.description}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-1 mb-1">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < (calculateAvrgReview() || 0) // Use first review rating or 0
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {reviews.length} Rating
          </span>
        </div>
        <button
          onClick={() => {
            setPopUp(!popUp);
          }}
          className="text-sm text-primary hover:underline"
        >
          add your review
        </button>
      </div>
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Reviews ({reviews.length})</h2>
          <button
            onClick={() => setShowAllReviews(true)}
            className="text-sm text-primary hover:underline"
          >
            See all reviews
          </button>
        </div>

        {bestReview && <ReviewList review={bestReview} />}
      </div>

      {popUp && (
        <ReviewPopup
          onClose={() => setPopUp(false)}
          productId={product.productId}
        />
      )}

      {showAllReviews && (
        <AllReviewsPopup
          onClose={() => setShowAllReviews(false)}
          reviews={reviews}
        />
      )}
    </Card>
  );
}

interface ReviewPopupProp {
  onClose: () => void;
  productId?: number;
}

function ReviewPopup({ onClose, productId }: ReviewPopupProp) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const customerId = Number(localStorage.getItem("id"));
  console.log(customerId);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:9090/api/reviews/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating,
          comment,
          customerId,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
        <h2 className="text-xl font-bold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Comment</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary"
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
