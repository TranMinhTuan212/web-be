import express from 'express'
import {
  createOrderController,
  getOrderByUserIdController,
  deleteOrderController,
  updateQuantityController
} from '~/Controllers/order.controller'
import { createProductVadidator } from '~/Middlewares/product.middeleware'

const orderRoutes = express.Router()

orderRoutes.post('/create', createOrderController)
orderRoutes.get('/getOrder', getOrderByUserIdController)
orderRoutes.delete('/delete', deleteOrderController)
orderRoutes.put('/update', updateQuantityController)

export default orderRoutes
