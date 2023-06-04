export const SET_ORDERS = 'SET_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const SET_ORDER_DOT = 'SET_ORDER_DOT'

export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    orders: [],
    isLoading: false,
    isOrderDot: false
}

export function orderReducer(state = initialState, action) {
    let orders
    switch (action.type) {
        /// UI
        case SET_ORDER_DOT:
            return { ...state, isOrderDot: action.isOrderDot }

        // Orders
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        case SET_ORDERS:
            return { ...state, orders: action.orders }
        case REMOVE_ORDER:
            orders = state.orders.filter(c => c._id !== action.orderId)
            return { ...state, orders: orders }
        case ADD_ORDER:
            orders = [...state.orders, action.order]
            return { ...state, orders }
        case UPDATE_ORDER:
            orders = state.orders.map(order => order._id === action.order._id ? action.order : order)
            return { ...state, orders: orders }
        default:
            return state
    }
}