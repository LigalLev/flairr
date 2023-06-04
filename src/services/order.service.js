import { utilService } from "./util.service"
import { storageService } from "./async-storage.service"
import { userService } from "./user.service"

const STORAGE_KEY = 'order'
export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder,
}

async function query(filterBy) {
  try {
    let orders = await storageService.query(STORAGE_KEY, filterBy)

    // if (filterBy.buyerId) {
    //   orders = orders.filter((order) => { return order.buyer._id === filterBy.buyerId})
    // }
    return orders
  } catch {
    console.log('Can not find orders');
  }
}

function getEmptyOrder() {
  return {
    _id: "",
    buyer: {
      _id: "b101",
      fullname: "Puki"
    },
    seller: {
      _id: "",
      fullname: ""
    },
    gig: {
      _id: "",
      title: "", //[name?]
      price: null,
      imgUrl: ""
    },
    status: "pending"
  }
}
function createOrder() {
  let orders = utilService.loadFromStorage(STORAGE_KEY)
  let order =
  {
    _id: "o1225",
    buyer: {
      _id: "",
      fullname: ""
    },
    seller: {
      _id: "",
      fullname: ""
    },
    gig: {
      _id: "i101",
      title: "Design Logo", //[name?]
      price: 20
    },
    status: "pending"
  }

  utilService.saveToStorage(STORAGE_KEY, order)
}

function getById(orderId) {
  return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await storageService.put(STORAGE_KEY, order)
  } else {
    // Later, owner is set by the backend
    order.gig.user = userService.getLoggedinUser()
    savedOrder = await storageService.post(STORAGE_KEY, order)
  }
  return savedOrder
}