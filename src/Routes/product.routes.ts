import express from 'express'
import {
  getAllProductsController,
  getProductByKeyWordController,
  updateProductController,
  createProductController,
  deleteProductController,
  getProductByIdController,
  uploadSingleImageController
} from '~/Controllers/product.controller'
import { createProductVadidator } from '~/Middlewares/product.middeleware'

const productRoutes = express.Router()

productRoutes.get('/all', getAllProductsController)
productRoutes.post('/create', createProductVadidator, createProductController)
productRoutes.post('/search', getProductByKeyWordController)
productRoutes.post('/detail', getProductByIdController)
productRoutes.put('/update', createProductVadidator, updateProductController)
productRoutes.post('/delete', deleteProductController)
productRoutes.post('/upload', uploadSingleImageController)

export default productRoutes
