import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ReviewList } from '../cmps/review-list'
import { loadReviews } from '../store/actions/review.actions'

export const ReviewPage = () => {
    const isLoading = useSelector((globalState) => globalState.systemReducer.isLoading)
    const reviews = useSelector((globalState) => (globalState.reviewReducer.reviews))

    useEffect(() => {
        loadReviews()
            .catch(err => console.log('Cannot load reviews', err))

    }, [])
    if (isLoading) return <div>Loading...</div>
    return <section className="random-page">
        <ReviewList reviews={reviews} />
    </section>
}