import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Hero } from '../cmps/hero'

export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    return (
        <section className="home-page main-layout full">
            <Hero />


            <section className="popular-services">
                <h2>Popular Services</h2>
            </section>

            <section className="info-wrapper main-layout full">
                <div className="info">

                    <div className="info-text">
                        <h2>The best part<span>?</span> Everything.</h2>

                        <h6>Stick to your budget</h6>
                        <p>Find the right service for every price point. No hourly rates, just project-based pricing.</p>

                        <h6>Get quality work done quickly</h6>
                        <p>Hand your project over to a talented freelancer in minutes, get long-lasting results.</p>

                        <h6>Pay when you're happy</h6>
                        <p>Upfront quotes mean no surprises. Payments only get released when you approve.</p>

                        <h6>Count on 24/7 support</h6>
                        <p>Our round-the-clock support team is available to help anytime, anywhere.</p>
                    </div>

                    <div className="img-wrapper">
                        <img src="https://res.cloudinary.com/dqhfnvtca/image/upload/v1685741317/flairr/selling-proposition-still-1400-x1_exn4qm.png" alt="Two smiling women using a laptop." />
                    </div>
                </div>
            </section>
        </section>

    )
}