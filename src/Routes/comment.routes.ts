import express from 'express'
import {
  createCommentController,
  deleteCommentController

} from '~/Controllers/comment.controller'
import { createCommentVadidator } from '~/Middlewares/comment.middeleware'
import { accsessTokenValidator } from '~/Middlewares/user.middeleware'


const commentRoutes = express.Router()

commentRoutes.post('/create', accsessTokenValidator,  createCommentVadidator, createCommentController)
// orderRoutes.get('/getOrder',accsessTokenValidator,  getOrderByUserIdController)
commentRoutes.delete('/delete', accsessTokenValidator, deleteCommentController)
// orderRoutes.put('/updateQuantity', updateQuantityController)
// orderRoutes.put('/updateStatus', updateStatusController)

export default commentRoutes
