export function SellerOrderList({ orders }) {

    return (
        <section className="seller-order-list-container">
            <ul className="seller-order-list">
                {orders.map(order =>
                    <li key={order._id} >
                            <div className="img-seller-order"><img src={order.gig.imgUrl} alt=""  /></div>
                            <div className="buyer-fullname-seller-order flex column"> <span>Gig</span>{order.gig.title}</div>
                            <div className="buyer-fullname-seller-order flex column"> <span>Buyer</span>{order.buyer.fullname}</div>
                            <div className="buyer-fullname-seller-order flex column">  <span>Price</span>${order.gig.price}</div>
                            <div className="buyer-fullname-seller-order flex column">  <span>Status</span>{order.status}</div>
                    </li>)}
            </ul>
        </section>
    )
}