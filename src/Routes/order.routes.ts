import express from 'express'
import {
  createOrderController,
  getOrderByUserIdController,
  deleteOrderController,
  updateQuantityController,
  updateStatusController

} from '~/Controllers/order.controller'
import { createOrderVadidator } from '~/Middlewares/order.middeleware'
import { accsessTokenValidator } from '~/Middlewares/user.middeleware'


const orderRoutes = express.Router()

orderRoutes.post('/create', accsessTokenValidator,  createOrderVadidator, createOrderController)
orderRoutes.get('/getOrder',accsessTokenValidator,  getOrderByUserIdController)
orderRoutes.delete('/delete', deleteOrderController)
orderRoutes.put('/updateQuantity', updateQuantityController)
orderRoutes.put('/updateStatus', updateStatusController)

export default orderRoutes
