// src/components/RatingBreakdown.tsx
import React from 'react';
import { Review } from '../types/product'; // Adjust path

interface RatingBreakdownProps {
    reviews: Review[];
}

const RatingBreakdown: React.FC<RatingBreakdownProps> = ({ reviews }) => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) {
        return <div className="text-sm text-gray-500">No ratings yet.</div>;
    }

    const ratingCounts: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRatingSum = 0;

    reviews.forEach(review => {
        if (ratingCounts[review.rating] !== undefined) {
            ratingCounts[review.rating]++;
            totalRatingSum += review.rating;
        }
    });

    const averageRating = (totalRatingSum / totalReviews).toFixed(1);

    return (
        <div className="space-y-1 w-full">
            <div className="flex items-center mb-2">
                <span className="text-yellow-500 text-lg font-bold mr-2">★</span>
                <span className="text-lg font-semibold mr-1">{averageRating}</span>
                <span className="text-sm text-gray-600">({totalReviews} ratings)</span>
            </div>
            {[5, 4, 3, 2, 1].map(star => {
                const count = ratingCounts[star];
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                    <div key={star} className="flex items-center text-sm">
                        <span className="text-gray-600 w-10">{star} star</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                            <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                                aria-label={`${percentage.toFixed(0)}%`}
                            ></div>
                        </div>
                        <span className="text-gray-600 w-8 text-right">{count}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default RatingBreakdown;
