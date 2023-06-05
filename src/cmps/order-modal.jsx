import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadOrders } from "../store/order.action"
import { utilService } from "../services/util.service"

export function OrderModal() {
    const orders = useSelector(storeState => storeState.orderModule.orders)


    useEffect(() => {
        loadOrders()
    }, [])

    return <ul className="buyer-order-list-container">
        {orders.map(order =>
            <li key={order._id} className="order-list-item">
                <div><img src={order.gig.imgUrl} alt="" className="order-list-img"/></div>
                <div>{order.gig.title}</div>
                <div className="order-list-buyer">
                <div>by{order.seller.fullname}</div>
                <div>{order.status}</div>
                </div>
            </li>)}
    </ul>
}
