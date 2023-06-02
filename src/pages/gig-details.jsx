import { useEffect, useState } from "react"
import { gigService } from "../services/gig.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { PricingPackage } from "../cmps/pricing-package.jsx"

export function GigDetails() {
    const [gig, setGig] = useState(null)
    const { gigId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadGig()
    }, [gigId])

    async function loadGig() {
        try {
            const gig = await gigService.getById(gigId)
            console.log('gig:', gig)
            setGig(gig)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/gig')
        }
    }

    function getRatingString(gig) {
        const gRatingStar = '⭐'
        if (!gig.owner.rate) return ''
        var ratingString = gRatingStar.repeat(gig.owner.rate)
        console.log('ratingString:', ratingString)
        return ratingString
    }

    return (
        <main className="gig-details-main full main-layout">
            <section className="top-nav-container full">
                <nav>
                    <Link >Overview</Link>
                    <Link >Description</Link>
                    {/* <Link to={`/gig/${gig._id}`}>About the seller</Link> */}
                </nav>
            </section>
            {gig && <section className="gig-details-content">
                <article className="gig-details-container">
                    <div>
                        <h1>{gig.title}</h1>
                        <div className="main-details-container">
                            <div className="user-round-img"></div>
                            <h2>{gig.owner.fullname}</h2>
                            <p className="gig-email">@{gig.owner.fullname}</p>
                            <p className="gig-level">Level : {gig.owner.level} <span>|</span></p>
                            <p className="gig-rate"> &#9733; &#9733; &#9733; &#9733; &#9733;<span>{gig.owner.rate}</span> (116)</p>
                            {/* <span class="rating-filled">{getRatingString(gig)}</span> */}

                            <p className="gig-orders">14 Orders in Queue</p>
                        </div>
                        <div className="img-container">
                            <img src={gig.imgUrl[0]}></img>
                        </div>
                        <div className="about-gig-container">
                            <h3>About this gig</h3>
                            <p>{gig.description}</p>
                        </div>
                    </div>
                   
                </article>
                <aside className="pricing-container">
                    <PricingPackage gig={gig}/> 
                </aside>


            </section>
        }





        </main>


    )
}