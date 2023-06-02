import { Link, NavLink } from "react-router-dom"
import React from 'react'



export function PricingPackage({ gig }) {
    console.log('gig:', gig)

    return (
        <section className="pricing-package">
            <nav>
                <NavLink>Basic</NavLink>
                <NavLink>Standard</NavLink>
                <NavLink>Premium</NavLink>
            </nav>
            <section className="pricing-details">
                <h1>${gig.price}</h1>
                <p>We charge just after the seller finished the project</p>
                <div className="brand-fundamental-container">
                    <p>Brand Fundamentals: <span> {gig.title}</span></p>
                </div>


                <div>
                    <p>{gig.daysToMake} Days Delivery</p>
                    <p>Unlimited Revision</p>
                </div>


            </section>


        </section>
    )

}


