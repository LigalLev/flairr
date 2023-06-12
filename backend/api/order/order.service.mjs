import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function query(filterBy) {
    console.log('filterBy:', filterBy)
    try {
        const criteria = {}
        criteria.$or = [ {"buyer._id": filterBy.buyerId},
            {"seller._id": filterBy.sellerId}]
        
        const collection = await dbService.getCollection('order')
        let orderCursor = await collection.find(criteria)
        const orders = orderCursor.toArray()
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = collection.findOne({ _id: ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}
async function getBySellerId(sellerId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = collection.find({ "seller._id": ObjectId(sellerId) })
        return order
    } catch (err) {
        logger.error(`while finding order ${sellerId}`, err)
        throw err
    }
}


async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ _id: ObjectId(orderId) })
        return orderId
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    try {
        const orderTosave = order


        // "buyer": {
        //     "_id": "",
        //     "fullname": ""
        // },
        // "seller": {
        //     "_id": "",
        //     "fullname": ""
        // },
        // "gig": {
        //     "_id": "",
        //     "title": "I will design modern minimalist elegant logo",
        //     "package": {
        //         "price": 20,
        //         "daysToComplete": 4
        //     },
        //     "imgUrl": "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607894/gigs/yc9ye93cjn3gfpgzsaid.png"
        // },
        // "status": "Pending"

        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderTosave)
        return orderTosave
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function update(order) {
    try {
        const orderToSave = order
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: ObjectId(order._id) }, { $set: orderToSave })
        return order
    } catch (err) {
        logger.error(`cannot update order ${orderId}`, err)
        throw err
    }
}

export const orderService = {
    query,
    getById,
    remove,
    add,
    update,
    // getBySellerId

}
