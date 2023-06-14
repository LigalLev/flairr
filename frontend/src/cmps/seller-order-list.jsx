import { StatusDropdown } from "./status-dropdown"
import { loadOrders } from "../store/order.action"
import { socketService } from "../services/socket.service";
import StatusDropdownDrawer from "./status-dropdown-drawer";


export function SellerOrderList({ orders, user, updateOrder }) {
    return (
        <section className="seller-order-list-container">
            <ul className="seller-order-list">
                {orders.filter(order => {
                    return order.seller._id === user._id
                }).map(order =>
                    <li key={order._id}>
                        <div className="img-seller-order"><img src={order.gig.imgUrl} alt="" /></div>
                        {/* <div className="seller-order order-title flex column"><span>Gig</span>{order.gig.title}</div> */}
                        <div className="seller-order flex column buyer"><span>Buyer</span><p>{order.buyer.fullname}</p></div>
                        <div className="seller-order flex column"><span>Price</span>${order.gig.price}</div>
                        <div className="seller-order flex column status-options"><span>Status</span>
                            <div className="statusdropdown-wrapper">
                                {/* <StatusDropdown initialStatus={order.status}
                                    onSelectStatus={(selectedStatus) => {
                                        const newOrder = { ...order, status: selectedStatus }
                                        updateOrder(newOrder)
                                        loadOrders({ sellerId: order.seller._id })
                                        socketService.emit('update-order-status', {
                                            order: order,
                                            status: selectedStatus
                                        })
                                    }} /> */}

                                <StatusDropdownDrawer
                                    initialStatus={order.status}
                                    onSelectStatus={(selectedStatus) => {
                                        const newOrder = { ...order, status: selectedStatus }
                                        updateOrder(newOrder)
                                        loadOrders({ sellerId: order.seller._id })
                                        socketService.emit('update-order-status', {
                                            order: order,
                                            status: selectedStatus
                                        })
                                    }} />

                            </div>
                        </div>
                    </li>)}
            </ul>
        </section>
    )
}