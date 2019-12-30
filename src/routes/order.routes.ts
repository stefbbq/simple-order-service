import express from 'express'
import { OrderController } from '../controllers/Order.controller'

let router = express.Router()
let orderController = new OrderController()

router.get('/', orderController.getOrders)
router.get('/:id', orderController.getOrder)
router.post('/', orderController.createOrder)
router.put('/:id', orderController.updateOrder)
router.delete('/:id', orderController.deleteOrder)

export default router
