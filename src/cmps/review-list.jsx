import React from 'react'
import { ReviewPreview } from "./review-preview.jsx";


export function ReviewList({ reviews }) {
    if (!reviews.length) return <div className="review-list"> No reviews yet.. be the 1st to add a review!</div>
    return <section className="review-list">
        {reviews.map((review, idx) => <ReviewPreview review={review} key={review._id} />
        )}
    </section>

}