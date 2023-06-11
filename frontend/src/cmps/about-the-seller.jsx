import { StarRating } from "../cmps/star-rating-new"

export function AboutTheSeller({ user, gig }) {


    return (
        <section className="about-the-seller">
            <h1 className="about-seller-header">About the seller</h1>
            {user && <section>
                <div className="seller-profesional-info-wrapper">
                    <div className="about-seller-img">
                        {/* <img src={user.imgUrl} alt="owner-img" className="details-owner-img" /> */}
                    </div>
                    <div className="seller-details-wrapper">
                        <div className="seller-name-email-wrapper">
                            {/* <h2>{user.fullname}</h2> */}
                            {/* <p className="about-gig-email">@{gig.owner.fullname}</p> */}
                        </div>
                        <div className="seller-profession-rating-wrapper">
                            {/* <p className="seller-profession">{gig.owner.profession}</p> */}
                            <div className="rating-wrapper">
                                {/* <StarRating rating={gig.owner.rate} /> */}
                                {/* <p><span>{gig.owner.rate}</span> ({gig.likedByUsers})</p> */}
                            </div>
                        </div>
                        <button className="contect-seller-btn">Contact me</button>
                    </div>
                </div>
                <div className="seller-personal-info-wrapper">
                    <div className="seller-short-info-wrapper">
                        <div>From
                            {/* <span>{gig.owner.from}</span> */}
                        </div>
                        <div>Member since
                            {/* <span>{gig.owner.memberSince}</span> */}
                        </div>
                        <div>Languages
                            {/* <span>{gig.owner.languages}</span> */}
                        </div>
                    </div>

                    <div className="seller-about">
                        <p>{gig.owner.about}</p>
                    </div>
                </div>

            </section>
            }
        </section>
    )
}