import React from 'react'
import { ReviewPreview } from "./review-preview.jsx";


export function ReviewList({ gig }) {
    const {reviews} = gig

    return(
        <section className='review-list'>
            <h1>Reviews</h1>
            {gig && 
            <section className='review-list-container'>
                {!reviews.length && <div className="review-list"> No reviews yet.. be the 1st to add a review!</div>}
                {reviews.map((review, idx)=> (
                    <li key={idx}>
                        <ReviewPreview gig={gig} review={review}/>
                    </li>
                ))}
            </section>}
      
        </section>
    )

}