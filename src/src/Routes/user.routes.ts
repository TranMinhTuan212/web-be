import express from 'express'

import {
  accsessTokenValidator,
  loginValidator,
  registerVadidator,
  refreshTokenValidator,
  emailVerifyTokenValidator,
  forgotPassWordValidator
} from '~/Middlewares/user.middeleware'
import {
  emailVerifyController,
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resendEmailVerifyController
} from '~/Controllers/user.controller'

import { wrapRequestHandler } from '~/Utils/handlers'
const userRoutes = express.Router()
/**
 * Description . login user
 * path:/login
 * Method: post
 * Body:{email:string,passwordLstring}
 */
userRoutes.post('/login', loginValidator, wrapRequestHandler(loginController))
userRoutes.post('/register', registerVadidator, wrapRequestHandler(registerController))
userRoutes.post('/logout', accsessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
userRoutes.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyController))
userRoutes.post('/resend-verify-email', accsessTokenValidator, wrapRequestHandler(resendEmailVerifyController))
userRoutes.post('/forgot-password', forgotPassWordValidator, wrapRequestHandler(forgotPasswordController))
userRoutes.get('/test-server', function(req: any, res: any){
  return res.json({
    status: 200,
    message: 'Run server successfully !',
    data: []
  })
})

export default userRoutes
