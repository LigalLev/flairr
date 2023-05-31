import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { addReview } from '../store/actions/review.actions.js';
import { StarsRating } from './stars-rating.jsx';

export const ReviewAdd = ({ gig }) => {
    const user = useSelector((globalState) => globalState.userReducer.user)
    const [isAdd, setIsAdd] = useState(false)
    const [review, setReview] = useState({
        name: '',
        rate: 1,
        txt: '',
    })

    useEffect(() => {
        if (user) {
            setReview((prevReview) => ({ ...prevReview, name: user.fullname }))
        }
    }, [gig])

    const handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        setReview((prevReview) => ({ ...prevReview, [field]: value }));
    };

    const saveReview = async (ev) => {
        try{
            ev.preventDefault()
            const reviewToAdd = { ...review, gigId: gig._id }
            await addReview(reviewToAdd)
            onToggleAddReview()
        }catch(err){
            console.log('Cannot save review', err)
        }
    }

    const onSaveRate = (rate) => {
        setReview((prevReview) => ({ ...prevReview, rate }));
    }

    const onToggleAddReview = () => {
        setIsAdd(!isAdd)
    }
    const { name, rate, readAt, txt } = review
    return (
        <section className="review-add">
            {!isAdd && <>
                {user && <>
                    <h1>Add a review : </h1>
                    <div className="add-btn" onClick={onToggleAddReview}> + </div>
                </>
                }
                {!user && <div>Please log in to add a review </div>}
            </>}
            {isAdd && <>
                <button className="form-btn" onClick={onToggleAddReview} >Back</button>
                <form >
                    <label htmlFor="name">Full Name : </label>
                    <input type="text" name="name" id="name" placeholder="Enter Full Name" value={name} onChange={handleChange} />

                    <label>Rate this book :</label>
                    <StarsRating rate={rate} onSaveRate={onSaveRate} />

                    <label htmlFor="read-at">Read at :</label>
                    <input type="date" name="read-at" id="read-at" value={readAt} onChange={handleChange} />

                    <label htmlFor="txt">Your Review : </label>
                    <textarea name="txt" id="txt" placeholder="Enter your review here" value={txt} onChange={handleChange} />

                    <button className="form-btn" onClick={(event) => saveReview(event)}>Add Review</button>
                </form>
            </>}
        </section>
    )
}