import { orderService } from "../services/order.service"
import { store } from './store'
import { ADD_ORDER, REMOVE_ORDER, SET_ORDER, SET_IS_LOADING, UPDATE_ORDER, SET_ORDER_DOT } from './order.reducer'

export async function loadOrders() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const orders = await orderService.query()
        console.log('orders after await:', orders)
        store.dispatch({ type: SET_ORDER, orders })
        return orders
    } catch (err) {
        console.log('order action -> Cannot load orders', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId)
        store.dispatch({ type: REMOVE_ORDER, orderId })
    } catch (err) {
        console.log('order action -> Cannot remove order', err)
        throw err
    }
}

export async function saveOrder(order) {
    const type = order._id ? UPDATE_ORDER: ADD_ORDER
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch({ type, order: savedOrder })
        return savedOrder
    } catch (err) {
        console.log('order action -> Cannot save order', err)
        throw err
    }
}

///UI

export function setRedDot(isOrderDot){
    store.dispatch({ type: SET_ORDER_DOT, isOrderDot })
}