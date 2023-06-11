export function SellerOrderList({ orders }) {

    return (
        <section className="seller-order-list">

            {orders.map(order =>
                <li key={order._id} >
                    {order._id}
                    {order.buyer.fullname}
                    {order.status}
                </li>)}

        </section>
    )
}