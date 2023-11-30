import express from 'express'
import {
  createCartController,
  getCartByUserIdController,
  deleteCartController,
  updateQuantityController
} from '~/Controllers/cart.controller'
import { createCartVadidator } from '~/Middlewares/cart.middeleware'
import { accsessTokenValidator } from '~/Middlewares/user.middeleware'

const cartRoutes = express.Router()

cartRoutes.post('/create',  accsessTokenValidator, createCartVadidator, createCartController)
cartRoutes.get('/all', accsessTokenValidator, getCartByUserIdController)
cartRoutes.delete('/delete', deleteCartController)
cartRoutes.put('/updateQuantity', createCartVadidator, updateQuantityController)

export default cartRoutes
