
import React from 'react'
export function ReviewPreview({ review }) {
    const getFormattedDate = () => {
        const date = new Date(review.createdAt);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    return (
        <div className="review">
            <h3>From : {review.byUser.username}</h3>
            <h4>{'⭐'.repeat(review.rate)}</h4>
            <p>"{review.txt}"</p>
            <p className="date"><small>{getFormattedDate()}</small></p>
        </div>
    )
}