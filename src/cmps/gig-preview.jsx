import { Link } from "react-router-dom"
import { gigService } from "../services/gig.service"

export function GigPreview({ gig }) {
    return <article className="gig-preview">
        <div className="img-wrapper">
            <Link to={`/gig/${gig._id}`}> <img src={gigService.getImgUrl(gig.imgUrl)} alt="" /></Link>
        </div>
        <div className="owner-name-rate-container">
            {/* <div>{gig.owner.nam}</div> */}
            <div className="preview-owner-fullName">{gig.owner.fullname}</div>
            <div className="preview-owner-level">{gig.owner.level}</div></div>
        <Link to={`/gig/${gig._id}`}> <div className="preview-gig-title">{gig.title}</div> </Link>
        <div>&#9733;{gig.owner.rate}</div>
        <div className="preview-gig-price">From ${gig.price}</div>
        {/* <Link to={`/gig/${gig._id}`}>Details</Link> | */}
    </article>
}