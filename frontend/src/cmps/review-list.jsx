import React from 'react'
import { ReviewPreview } from "./review-preview.jsx";
import { ReviewBars } from './review-bars.jsx';


export function ReviewList({ gig }) {
    const {reviews} = gig
    console.log('gig:', gig)


    return(
        <section className='review-list'>
            <h1>Reviews</h1>
            <ReviewBars/>
            {gig.reviews && !gig.reviews.length && <div className="review-list"> No reviews yet.. be the 1st to add a review!</div>}
            {gig.reviews && 
            <section className='review-list-container'>
                {reviews.map((review, idx)=> (
                    <li key={idx}>
                        <ReviewPreview gig={gig} review={review}/>
                    </li>
                ))}
            </section>}
      
        </section>
    )

}