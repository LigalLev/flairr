import { Link } from "react-router-dom"
import { gigService } from "../services/gig.service"

export function GigPreview({ gig, onRemoveGig }) {
    return <article className="gig-preview">
        <div className="img-wrapper">
        <Link to={`/gig/${gig._id}`}> <img src={gigService.getImgUrl(gig.imgUrl)} alt="" /></Link>
        </div>
        <h4 className="gig-name">{gig.name}</h4>
        <h4>${gig.price}</h4>
        <Link to={`/gig/${gig._id}`}>Details</Link> |
        <Link to={`/gig/edit/${gig._id}`}>Edit</Link> |
        <button className="btn" onClick={() => { onRemoveGig(gig._id) }}>Delete item</button>


    </article>
}