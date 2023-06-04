import { utilService } from "./util.service"
const STORAGE_KEY = 'order'
export const orderService = {
    query,
    getById,
    save,
    remove,
}

async function query() {
    let orders = await storageService.query(STORAGE_KEY)
    return orders
}


function createOrder(){
    let orders = utilService.loadFromStorage(STORAGE_KEY)
    // if (!orders || !orders.length)
     orders = [
    {
          _id: "o1225",
          buyer: "mini-user",
          seller: "mini-user",
          gig: {
            _id: "i101",
            title: "Design Logo", //[name?]
            price: 20
          },
          status: "pending"
        }
      ]
      utilService.saveToStorage(STORAGE_KEY, Order)
}

function getById(orderId) {
  return storageService.get(STORAGE_KEY, orderId)
}

async function remove(gigId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
  var savedOrder
  if (order._id) {
      savedOrder = await storageService.put(STORAGE_KEY, order)
  } else {
      // Later, owner is set by the backend
      gig.owner = userService.getLoggedinUser()
      savedOrder = await storageService.post(STORAGE_KEY, order)
  }
  return savedOrder
}