import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'
import { getOrders, getOrderById, addOrder, updateOrder, removeOrder } from './order.controller.mjs'
// 
const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getOrders)
router.get('/:id', getOrderById)
router.post('/', requireAuth, addOrder)
// router.put('/:id', requireAuth, updateOrder)
router.put('/:id', updateOrder)
router.delete('/:id', requireAuth, removeOrder)
// router.delete('/:id', requireAuth, requireAdmin, removeOrder)


export const orderRoutes = router
