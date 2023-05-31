import { Link } from "react-router-dom"
import { gigService } from "../services/gig.service"

export function GigPreview({ gig }) {
    return <article className="gig-preview">
        <div className="img-wrapper">
        <Link to={`/gig/${gig._id}`}> <img src={gigService.getImgUrl(gig.imgUrl)} alt="" /></Link>
        </div>
        <div>{gig.owner.fullname}</div>
        <div>{gig.owner.level}</div>
        <div className="gig-title">{gig.title}</div>
        <div>${gig.owner.rate}</div>
        <div>${gig.price}</div>
        {/* <Link to={`/gig/${gig._id}`}>Details</Link> | */}

    </article>
}