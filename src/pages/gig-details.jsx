import { useEffect, useState} from "react"
import { gigService } from "../services/gig.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { PricingPackage } from "../cmps/pricing-package.jsx"
import { GigShoppingCart } from '../cmps/gig-shopping-cart'
import { utilService } from "../services/util.service"
import {BigCarousel} from "../cmps/big-carousel"
import { Payment } from "../pages/payment"

export function GigDetails() {
    const [gig, setGig] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const { gigId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadGig()
    }, [gigId])

    useEffect(() => {

    }, [isOpen])

    async function loadGig() {
        try {
            const gig = await gigService.getById(gigId)
            console.log('gig:', gig)
            setGig(gig)
        } catch (err) {
            console.log('Had issues in order details', err)
            showErrorMsg('Cannot load order')
            navigate('/gig')
        }
    }

    function getRatingString(gig) {
        const ratingStar = '&#9733;'
        if (!gig.owner.rate) return ''
        var ratingString = ratingStar.repeat(gig.owner.rate + 1)
        console.log('ratingString:', ratingString)
        return ratingString
    }

    function onToggleIsOpen() {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    const classMenu = (isOpen) ? 'isOpen' : ''

    return (
        <main className={`gig-details-main full main-layout ${classMenu}`}>
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
                            <div className="user-round-img">
                                <img src={utilService.resizeImgUrl(gig.owner.imgUrl)} alt="" className="details-owner-img" />
                            </div>
                            <div className="details-wrapper">
                                <h2>{gig.owner.fullname}</h2>
                                <p className="gig-email">@{gig.owner.fullname}</p>
                                <p className="gig-level">Level {gig.owner.level} <span>|</span></p>
                                <p className="gig-rate"> <span>&#9733; &#9733; &#9733; &#9733; &#9733;{gig.owner.rate}</span> (116)</p>
                                {/* <span className="rating-filled">{getRatingString(gig)}</span> */}
                                <p className="gig-orders">14 Orders in Queue</p>
                            </div>

                        </div>
                        <div style={{maxWidth:"700px"}}>
                         < BigCarousel imgUrls={gig.imgUrl}/>
                        </div>
                        <div className="about-gig-container">
                            <h3>About this gig</h3>
                            <p>{gig.description}</p>
                        </div>
                    </div>

                </article>
                <aside className="pricing-container">
                    <PricingPackage
                        gig={gig}
                        onToggleIsOpen={onToggleIsOpen}
                    />
                </aside>

                <GigShoppingCart
                    gig={gig}
                    onToggleIsOpen={onToggleIsOpen}
                    classMenu={classMenu}
                />

                <div className={`main-screen ${classMenu}`} onClick={onToggleIsOpen}></div>
            </section>
            }





        </main>


    )
}