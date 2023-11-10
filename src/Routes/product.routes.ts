import express from 'express'
import {
  getAllProductsController,
  getProductByKeyWordController,
  updateProductController,
  createProductController,
  deleteProductController,
  getProductByIdController
} from '~/Controllers/product.controller'
import { createProductVadidator } from '~/Middlewares/product.middeleware'

const productRoutes = express.Router()

productRoutes.get('/all', getAllProductsController)
productRoutes.post('/create', createProductVadidator, createProductController)
productRoutes.post('/search', getProductByKeyWordController)
productRoutes.post('/detail', getProductByIdController)
productRoutes.put('/update', updateProductController)
productRoutes.post('/delete', deleteProductController)

export default productRoutes
