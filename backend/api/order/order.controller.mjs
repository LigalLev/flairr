import {orderService} from './order.service.mjs'
import {logger} from '../../services/logger.service.mjs'

export async function getOrders(req, res) {
  
    try {
      logger.debug('Getting Orders:', req.query)
      const  filterBy   = req.query
      const orders = await orderService.query(filterBy)
      res.json(orders)
    } catch (err) {
      logger.error('Failed to get orders', err)
      res.status(400).send({ err: 'Failed to get orders' })
    }
  }
  export async function getOrderById(req, res) {
    try {
      const orderId = req.params.id
      const order = await orderService.getById(orderId)
      res.json(order)
    } catch (err) {
      logger.error('Failed to get order', err)
      res.status(400).send({ err: 'Failed to get order' })
    }
  }
  export async function addOrder(req, res) {
    console.log('req:', req)
    // const {loggedinUser} = req
    try {
      const order = req.body
    //   gig.owner = loggedinUser
      const addedOrder = await orderService.add(order)
      res.json(addedOrder)
    } catch (err) {
      logger.error('Failed to add order', err)
      res.status(400).send({ err: 'Failed to add order' })
    }
  }

  
export async function updateOrder(req, res) {
    try {
      const order = req.body
      const updatedOrder = await orderService.update(order)
      res.json(updatedOrder)
    } catch (err) {
      logger.error('Failed to update order', err)
      res.status(400).send({ err: 'Failed to update order' })
  
    }
  }
  
  export async function removeOrder(req, res) {
    try {
      const orderId = req.params.id
      const removedId = await orderService.remove(orderId)
      res.send(removedId)
    } catch (err) {
      logger.error('Failed to remove order', err)
      res.status(400).send({ err: 'Failed to remove order' })
    }
  }