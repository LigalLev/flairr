import { StatusDropdown } from "./status-dropdown"
export function SellerOrderList({ orders, user, updateOrder}) {
    return (
        <section className="seller-order-list-container">
            <ul className="seller-order-list">
                {orders.filter(order => { return order.seller._id === user._id }).map(order =>
                    <li key={order._id} >
                        <div className="img-seller-order"><img src={order.gig.imgUrl} alt="" /></div>
                        <div className="seller-order flex column"> <span>Gig</span>{order.gig.title}</div>
                        <div className="seller-order flex column"> <span>Buyer</span>{order.buyer.fullname}</div>
                        <div className="seller-order flex column">  <span>Price</span>${order.gig.price}</div>
                        <div className="seller-order flex column status-options" >  <span>Status</span>
                            {/* <StatusDropdown initialStatus={order.status}  */}
                            onSelectStatus={(selectedStatus) => {
                                // console.log(`will send http request with ${selectedStatus}`)
                                const newOrder = {...order, status: selectedStatus}
                                updateOrder(newOrder)
                                
                            }} />
                        </div>
                    </li>)}
            </ul>
        </section>
    )
}