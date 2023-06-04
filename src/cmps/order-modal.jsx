import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadOrders } from "../store/order.action"

export function OrderModal() {
    const orders = useSelector(storeState => storeState.orderModule.orders)


    useEffect(() => {
        loadOrders()
    }, [])


  

    return <ul className="order-list">
        {orders.map(order =>
            <li key={order._id}>
                <div><img src={order.gig.urls[0]} alt="" /></div>
                <div>{order.gig.title}</div>
                <div>by{order.seller.fullname}</div>
                <div>{order.status}</div>
            </li>)}
    </ul>
}
