import { useEffect, useState } from "react";
import { Review } from "@/types/product";
import { Star, User } from "lucide-react";
interface User {
  id: number;
  username: string;
  email: string;
}
export function ReviewList({ review }: { review: Review }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/customers/${review.customerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [review.customerId]);
  return (
    <div key={review.reviewId} className="border rounded-md p-3 mb-2">
      <div className="flex items-center gap-2 mb-1">
        <div className="bg-muted rounded-full p-1">
          <User className="h-4 w-4" />
        </div>
        <span className="font-medium">{user?.username || "Anonymous"}</span>
      </div>
      <p className="text-sm mb-1">{review.comment}</p>
      <div className="flex">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
      </div>
    </div>
  );
}
