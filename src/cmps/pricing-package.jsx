import { Link } from "react-router-dom"


export function PricingPackage({ gig }) {

    return (
        <section className="pricing-package">
            <nav>
                <Link>Basic</Link>
                <Link>Standard</Link>
                <Link>Premium</Link>
            </nav>
            <section>
                <h1>${gig.price}</h1>
                <p>We charge just after the seller finished the project</p>
                <div>
                    <p>{gig.daysToMake} Days Delivery</p>
                    <p>Unlimited Revision</p>
                </div>
            </section>


        </section>
    )

}


