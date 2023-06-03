export function GigShoppingCart({ gig }) {


    return (
        <section className="shopping-cart">
            <div className="cart-header">
                <h2>Order summery</h2>
                <svg width="16" height="16" viewBox="0 0 11 10" xmlns="http://www.w3.org/2000/svg"><path d="M7.21548 5L10.5817 1.63375C10.7764 1.43906 10.7764 1.12313 10.5817 0.928127L9.79954 0.145939C9.60485 -0.0487482 9.28891 -0.0487482 9.09391 0.145939L5.72798 3.5125L2.36173 0.146252C2.16704 -0.0484356 1.8511 -0.0484356 1.6561 0.146252L0.874226 0.928127C0.679539 1.12281 0.679539 1.43875 0.874226 1.63375L4.24048 5L0.874226 8.36625C0.679539 8.56094 0.679539 8.87687 0.874226 9.07187L1.65641 9.85406C1.8511 10.0487 2.16704 10.0487 2.36204 9.85406L5.72798 6.4875L9.09423 9.85375C9.28891 10.0484 9.60485 10.0484 9.79985 9.85375L10.582 9.07156C10.7767 8.87688 10.7767 8.56094 10.582 8.36594L7.21548 5Z" /></svg>
            </div>
            {gig && <section className="purchase-details">
                <div className="basic-information">
                    <h1>Basic information</h1>
                    <p><span>Description:</span> {gig.title}</p>
                    <p><span>Price for single order</span> ${gig.price}</p>
                </div>
                
                <article className="total-order-wrapper">
                    <p><span>${gig.price}</span></p>
                    <p>For single order</p>

                    <div className="delivery-info-container">
                        <div>
                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" /><path d="M9 4H7v5h5V7H9V4z" /></svg>
                            <p className="delivery-days-item">{gig.daysToMake} Days Delivery</p>
                        </div>
                        <div>
                            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.50001 11.4999C6.40001 13.3999 9.60001 13.3999 11.5 11.4999C12.2 10.7999 12.7 9.7999 12.9 8.7999L14.9 9.0999C14.7 10.5999 14 11.8999 13 12.8999C10.3 15.5999 5.90001 15.5999 3.10001 12.8999L0.900012 15.0999L0.200012 8.6999L6.60001 9.3999L4.50001 11.4999Z" /><path d="M15.8 7.2999L9.40001 6.5999L11.5 4.4999C9.60001 2.5999 6.40001 2.5999 4.50001 4.4999C3.80001 5.1999 3.30001 6.1999 3.10001 7.1999L1.10001 6.8999C1.30001 5.3999 2.00001 4.0999 3.00001 3.0999C4.40001 1.6999 6.10001 1.0999 7.90001 1.0999C9.70001 1.0999 11.5 1.7999 12.8 3.0999L15 0.899902L15.8 7.2999Z" /></svg>
                            <p className="unlimited-revision-element">Unlimited Revision</p>
                        </div>
                    </div>
                </article>

                <div className="pricing-footer">
                    <button className="btn-continue-purchase">Continue (${gig.price})</button>
                    <p className="not-charging">You won't be charged yet</p>

                </div>
            </section>}

        </section>
    )
}
