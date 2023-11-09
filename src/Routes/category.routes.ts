import express from 'express'
import { getAllCategoryController, createCategoryController } from '~/Controllers/category.controller'

const categoryRoutes = express.Router()

categoryRoutes.get('/all', getAllCategoryController)
categoryRoutes.post('/create', createCategoryController)

export default categoryRoutes
