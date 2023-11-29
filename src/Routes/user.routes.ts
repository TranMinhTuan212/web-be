import { json } from 'stream/consumers'
import express from 'express'

import {
  accsessTokenValidator,
  loginValidator,
  registerVadidator,
  refreshTokenValidator,
  emailVerifyTokenValidator,
  forgotPassWordValidator,
  updateAdressValidator,
  changePasswordValidator,
  forgotPassWordVerifyTokenValidator,
  resetPasswordValidator
} from '~/Middlewares/user.middeleware'
import {
  VerifyforgotPasswordController,
  adminMeProfileController,
  allMeProfileController,
  changePasswordController,
  deleteUserController,
  emailVerifyController,
  forgotPasswordController,
  loginController,
  logoutController,
  meProfileController,
  registerController,
  resendEmailVerifyController,
  resetPasswordController,
  searchUserController,
  updateMeController,
  uploadSingleImageController
} from '~/Controllers/user.controller'

import { wrapRequestHandler } from '~/Utils/handlers'

const userRoutes = express.Router()
/**
 * Description . login user
 * path:/login
 * Method: post
 * Body:{email:string,passwordLstring}
 */
userRoutes.get('/test-server', function (req: any, res: any) {
  return res.json({
    status: 200,
    message: 'Run server Successfully !',
    data: []
  })
})
userRoutes.post('/login', loginValidator, wrapRequestHandler(loginController))
userRoutes.post('/register', registerVadidator, wrapRequestHandler(registerController))
userRoutes.post('/logout', accsessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
userRoutes.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(emailVerifyController))
userRoutes.post('/resend-verify-email', accsessTokenValidator, wrapRequestHandler(resendEmailVerifyController))
userRoutes.post('/forgot-password', forgotPassWordValidator, wrapRequestHandler(forgotPasswordController))
userRoutes.post(
  '/verify-forgot-password',
  forgotPassWordVerifyTokenValidator,
  wrapRequestHandler(VerifyforgotPasswordController)
)
userRoutes.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))
userRoutes.post('/check-token', accsessTokenValidator, function (req: any, res: any) {
  return res.json({
    status: 200,
    message: 'Check token Successfully !',
    data: []
  })
})
userRoutes.get('/me-profile', accsessTokenValidator, wrapRequestHandler(meProfileController))
userRoutes.post('/admin-MeProfile', accsessTokenValidator, wrapRequestHandler(adminMeProfileController))
userRoutes.patch('/updateMe', accsessTokenValidator, updateAdressValidator, wrapRequestHandler(updateMeController))
userRoutes.get('/allmetable-profile', accsessTokenValidator, wrapRequestHandler(allMeProfileController))
userRoutes.post('/deleteUser', accsessTokenValidator, wrapRequestHandler(deleteUserController))
userRoutes.post('/search-user', accsessTokenValidator, wrapRequestHandler(searchUserController))
userRoutes.post('/upload-image', accsessTokenValidator, wrapRequestHandler(uploadSingleImageController))
userRoutes.patch(
  '/changePassword',
  accsessTokenValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

// userRoutes.get('/h-user', wrapRequestHandler(meProProductfileController))

export default userRoutes
