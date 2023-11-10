import express from 'express'
import {
  createOrderController,
  getOrderByUserIdController,
  deleteOrderController
} from '~/Controllers/order.controller'
import { createProductVadidator } from '~/Middlewares/product.middeleware'

const orderRoutes = express.Router()

orderRoutes.post('/create', createOrderController)
orderRoutes.get('/getOrder', getOrderByUserIdController)
orderRoutes.post('/delete', deleteOrderController)

export default orderRoutes
