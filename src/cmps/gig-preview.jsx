import { Link } from "react-router-dom"
import { gigService } from "../services/gig.service"
import { Carousel } from "react-responsive-carousel"
import { CarouselContainer } from "./carousel-container"
import { utilService } from "../services/util.service"


export function GigPreview({ gig }) {
    return <article className="gig-preview">
        {/* <div className="img-wrapper"> */}
        <CarouselContainer gig={gig} />
        {/* </div> */}
        <div className="content-container">
            <div className="owner-details-container">
                <div className="img-name-preview">
                    <img src={utilService.resizeImgUrl(gig.owner.imgUrl)} alt="" className="preview-owner-img" />
                    <div className="preview-owner-fullName">{gig.owner.fullname}</div>
                </div>
                <div className="preview-owner-level">{gig.owner.level}</div>
            </div>
            <Link to={`/gig/${gig._id}`}> <div className="preview-gig-title">{gig.title}</div> </Link>
            <div className="preview-rate">&#9733;{gig.owner.rate}</div>
            <div className="preview-gig-price">From ${gig.price}</div>
        </div>
        {/* <Link to={`/gig/${gig._id}`}>Details</Link> | */}
    </article>
}