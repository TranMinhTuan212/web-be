import express from 'express'
import {
    getAllProductsController,
    getProductByKeyWordController,
    updateProductController,
    createProductController,
    deleteProductController
} from '~/Controllers/product.controller'
import { 
    createProductVadidator,
} from '~/Middlewares/product.middeleware'

const productRoutes = express.Router()

productRoutes.get('/all', getAllProductsController)
productRoutes.post('/create', createProductVadidator, createProductController)
productRoutes.get('/search', getProductByKeyWordController)
productRoutes.post('/update', updateProductController)
productRoutes.post('/delete', deleteProductController)


export default productRoutes
