import React from 'react'

export default function VendorReviews() {
        return (
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Customer Reviews
            </h2>
            {reviews.length > 0 ? (
              <div className="bg-white p-6 rounded-lg shadow space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b pb-3 last:border-b-0"
                  >
                    <p className="font-semibold">
                      {review.user} -{" "}
                      <span className="text-yellow-500">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </p>
                    <p className="text-gray-600 mt-1">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow">
                No reviews received yet.
              </div>
            )}
          </section>
        );
}

