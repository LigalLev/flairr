import React from 'react'
import { StarRating } from "../cmps/star-rating-new"
import { utilService } from "../services/util.service"



export function ReviewPreview({ gig, review }) {
    // const getFormattedDate = () => {
    //     const date = new Date(review.createdAt);
    //     return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    // }

    const imageBackgroundClr=utilService.getRandomColor()

    return (
        <section className="review-preview">
            {review && <div className='reviewer-preview-wrapper'>
                <div className='reviewer-name-label-wrapper'>
                    <div className='reviewer-name-label' style={{ backgroundColor: imageBackgroundClr }}>{review.name.charAt(0).toUpperCase()}</div>
                </div>
                <div className='reviewer-details-wrapper'>
                    <p>{review.name}</p>
                    <div className='reviewer-region-wrapper'>
                        <div className='flag-wrapper'>
                            <img src={review.flag}></img>
                        </div>
                        <p>{review.country}</p>
                    </div>
                    <div className="review-starRate-wrapper">
                        <StarRating rating={review.rate} />
                        <div className="seller-rate">
                            {gig.owner.rate}  <span></span>
                            <p>{review.createdAt}</p>
                        </div>
                    </div>
                    <p className='review-content'>{review.review}</p>

                    <div className='review-footer'>
                        <div className='gig-img-reviewer-container'>
                            <img src={gig.imgUrls[1]} />
                        </div>
                        <div className="feedback-container">
                            <p>Helpful?</p>
                            <p>Yes</p>
                            <p>No</p>
                        </div>

                    </div>
                </div>
            </div>}
        </section>
    )
}