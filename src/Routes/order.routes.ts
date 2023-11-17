import express from 'express'
import {
  createOrderController,
  getOrderByUserIdController,
  deleteOrderController,
  updateQuantityController
} from '~/Controllers/order.controller'
import { createOrderVadidator } from '~/Middlewares/order.middeleware'

const orderRoutes = express.Router()

orderRoutes.post('/create', createOrderVadidator, createOrderController)
orderRoutes.get('/getOrder', getOrderByUserIdController)
orderRoutes.delete('/delete', deleteOrderController)
orderRoutes.put('/updateQuantity', updateQuantityController)

export default orderRoutes
