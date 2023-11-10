import express, { Router } from 'express'
import { uploadSingleImageController } from '~/Controllers/imageMedias.controller'
import { accsessTokenValidator } from '~/Middlewares/user.middeleware'
import { wrapRequestHandler } from '~/Utils/handlers'
const imageMediasRouter = express.Router()

// imageMediasRouter.post('/image-medias', accsessTokenValidator, wrapRequestHandler(uploadSingleImageController))
imageMediasRouter.post('/image-medias', accsessTokenValidator, wrapRequestHandler(uploadSingleImageController))
export default imageMediasRouter
