import { StarRating } from "../cmps/star-rating-new"

export function AboutTheSeller({ gig }) {



    return (
        <section className="about-the-seller">
            <h1 className="about-seller-header">About the seller</h1>
            {gig && <section>
                <div className="seller-profesional-info-wrapper">
                    <div className="about-seller-img">
                        <img src={gig.owner.imgUrl} alt="owner-img" className="details-owner-img" />
                    </div>
                    <div className="seller-details-wrapper">
                        <div className="seller-name-email-wrapper">
                            <h2>{gig.owner.fullname}</h2>
                            <p className="about-gig-email">@{gig.owner.fullname}</p>
                        </div>
                        <div className="seller-profession-rating-wrapper">
                            <p className="seller-profession">{gig.owner.profession}</p>
                            <div className="rating-wrapper">
                                <StarRating rating={gig.owner.rate} />
                                <p><span>{gig.owner.rate}</span> ({gig.likedByUsers})</p>     
                            </div>
                        </div>
                        <button className="contect-seller-btn">Contact me</button>
                    </div>
                </div>
                <div className="seller-personal-info-wrapper">
                    <div>From
                        <span>{gig.owner.from}</span>
                    </div>
                    <div>Member since
                        <span>{gig.owner.memberSince}</span>
                    </div>
                    <div>Languages
                        <span>{gig.owner.Languages}</span>
                    </div>
                    <div>
                        <p>{gig.owner.about}</p>
                    </div>
                </div>

            </section>
            }
        </section>
    )
}