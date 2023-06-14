import { useEffect, useState, useRef } from "react"
import { useSelector } from 'react-redux'
import { gigService } from "../services/gig.service"
import { userService } from "../services/user.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { PricingPackage } from "../cmps/pricing-package.jsx"
import { GigShoppingCart } from '../cmps/gig-shopping-cart'
import { utilService } from "../services/util.service"
import { BigCarousel } from "../cmps/big-carousel"
import { Payment } from "../pages/payment"
import { StarRating } from "../cmps/star-rating-new"
import { AboutTheSeller } from "../cmps/about-the-seller"
import { ReviewList } from "../cmps/review-list"


export function GigDetails() {
    const [gig, setGig] = useState(null)
    const [owner, setOwner] = useState (null)
    // const user = useSelector(storeState => storeState.userModule.user)
    const [isOpen, setIsOpen] = useState(false)
    const { gigId } = useParams()
    const navigate = useNavigate()

    const overview = useRef(null)
    const aboutThisGig = useRef(null)
    const aboutTheSeller = useRef(null)
    const sellerReviews = useRef(null)

    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior:'smooth'
        })
    }

    useEffect(() => {
        loadGig()
    }, [gigId])

    useEffect(() => {

    }, [isOpen])

    async function loadGig() {
        try {

            const gig = await gigService.getById(gigId)
            setGig(gig)
            const owner = await userService.getById(gig.owner._id)
            console.log('gig:', gig)
            setOwner(owner)
        } catch (err) {
            console.log('Had issues in order details', err)
            showErrorMsg('Cannot load order')
            navigate('/gig')
        }
    }

    function onToggleIsOpen() {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    const classMenu = (isOpen) ? 'isOpen' : ''

    return (
        <main className={`gig-details-main full main-layout ${classMenu}`}>

            <section className="top-nav-container full">
                <nav>
                    <Link onClick={()=> scrollToSection(overview)}>Overview</Link>
                    <Link onClick={()=> scrollToSection(aboutThisGig)}>Description</Link>
                    <Link onClick={()=> scrollToSection(aboutTheSeller)}>About the seller</Link>
                    <Link onClick={()=> scrollToSection(sellerReviews)}>Reviews</Link>
                    {/* <Link to={`/gig/${gig._id}`}>About the seller</Link> */}
                </nav>
            </section>

            {gig && <section className="gig-details-content">

                <article ref={overview} className="gig-details-container">

                    <h1>{gig.title}</h1>
                    <div className="main-details-container">
                        <div className="user-round-img">
                            <img src={gig.owner.imgUrl} alt="" className="details-owner-img" />
                        </div>
                        <div className="details-wrapper">
                            <h2>{gig.owner.fullname}</h2>
                            <p className="gig-email">@{gig.owner.fullname}</p>
                            <p className="gig-level">Level {gig.owner.level} <span>|</span></p>
                            <div className="gig-starRate">
                                <StarRating rating={gig.owner.rate} />
                                <div className="owner-rate">
                                    {gig.owner.rate} <span>(116)</span>
                                </div>
                            </div>
                            <p className="gig-orders">14 Orders in Queue</p>
                        </div>
                    </div>
                    <div className="carousel-wrapper" >
                        < BigCarousel imgUrls={gig.imgUrls} />
                    </div>

                </article>

                <aside className="pricing-container">
                    <PricingPackage
                        gig={gig}
                        onToggleIsOpen={onToggleIsOpen}
                    />
                </aside>

                <article ref={aboutThisGig} className="about-gig-container">
                    <h3>About this gig</h3>
                    {gig.description.split('\n').map((section, idx) => (
                        <p key={idx} >
                            {section}
                        </p>
                    ))}
                </article>

                <article ref={aboutTheSeller} className="about-seller-container">
                   {owner && <AboutTheSeller
                        user={owner}
                    />}
                </article>

                <article ref={sellerReviews} className="gig-review">
                    <ReviewList
                        gig={gig}
                    />
                </article>

                <GigShoppingCart
                    gig={gig}
                    onToggleIsOpen={onToggleIsOpen}
                    classMenu={classMenu}
                />

                <div className={`main-screen ${classMenu}`} onClick={onToggleIsOpen}></div>

            </section>


            }



            {/* <ReviewIndex/> */}

        </main>


    )
}